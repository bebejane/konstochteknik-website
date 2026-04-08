import { NextRequest, NextResponse } from 'next/server';
import { sleep } from 'next-dato-utils/utils';
import { revalidatePath } from 'next/cache';
import config from '@/datocms.config';
import client from '@/lib/client';
import fs from 'fs';
import { Project } from '@/@types/datcms-cma';
import hash from 'object-hash';
import { uploadLocalFileAndReturnPath, type ApiTypes } from '@datocms/cma-client-node';

const width = 1920;
const height = 1080;

const CHROMIUM_PACK_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
	? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/chromium-pack.tar`
	: 'https://github.com/gabenunez/puppeteer-on-vercel/raw/refs/heads/main/example/chromium-dont-use-in-prod.tar';

// Cache the Chromium executable path to avoid re-downloading on subsequent requests
let cachedExecutablePath: string | null = null;
let downloadPromise: Promise<string> | null = null;

export async function POST(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const { entity } = await request.json();
	const id = entity ? entity.id : searchParams.get('id');

	console.log('screenshot api route:', id);

	if (!id) return new NextResponse('Please provide a id.', { status: 400 });

	const record = await client.items.find<Project>(id, { nested: true, version: 'published' });

	if (!record) return new NextResponse('Record not found', { status: 404 });

	const recordHash = hash({ ...record, meta: undefined, thumbnail: undefined });
	const thumbnail = (record.thumbnail as any)?.upload_id
		? await client.uploads.find((record.thumbnail as any)?.upload_id as string)
		: null;

	const currentHash = thumbnail?.default_field_metadata?.en?.custom_data.hash;

	if (currentHash === recordHash) {
		console.log('screenshot', 'skip since the same');
		return new NextResponse('skip', { status: 200 });
	}

	const url = `${process.env.NEXT_PUBLIC_SITE_URL}/screenshot/${record.id}`;

	try {
		console.time('screenshot');
		const browser = await getBrowser();
		const page = await browser.newPage();
		await page.setViewport({ width, height });
		await page.goto(url, { waitUntil: 'networkidle2' });
		await sleep(3000);

		const screenshot = await page.screenshot({ type: 'png' });
		const filename = `${record.slug}-screenshot.png`;
		const filePath = `/tmp/${filename}`;
		const title = `${record.title}`;

		fs.writeFileSync(filePath, screenshot);

		let upload: ApiTypes.Upload;
		const uploadMetadata = {
			tags: ['screenshot'],
			default_field_metadata: {
				en: {
					title,
					alt: title,
					custom_data: {
						hash: recordHash,
					},
				},
			},
		};

		if (record.thumbnail?.upload_id) {
			const uploadId = record.thumbnail?.upload_id;
			await client.uploads.update(uploadId, { ...uploadMetadata });
			upload = await client.uploads.update(
				uploadId,
				{ path: await uploadLocalFileAndReturnPath(client, filePath) },
				{ replace_strategy: 'create_new_url' },
			);
		} else {
			upload = await client.uploads.createFromLocalFile({
				localPath: filePath,
				...uploadMetadata,
			});
		}

		await client.items.update(record.id, { thumbnail: { upload_id: upload.id } });
		await client.items.publish(record.id);
		await sleep(3000);

		const paths = await config.routes?.project(record);
		paths?.forEach((path) => revalidatePath(path));

		return new NextResponse('ok', { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{
				error: 'An error occurred while generating the screenshot.',
				message: error.message,
			},
			{
				status: 500,
			},
		);
	} finally {
		console.timeEnd('screenshot');
	}
}

async function getBrowser() {
	console.log(CHROMIUM_PACK_URL);
	const isVercel = !!process.env.VERCEL_ENV;
	let puppeteer: any,
		launchOptions: any = {
			headless: true,
		};

	if (isVercel) {
		const chromium = (await import('@sparticuz/chromium')).default;
		puppeteer = await import('puppeteer-core');

		const executablePath = await getChromiumPath();
		launchOptions = {
			...launchOptions,
			args: chromium.args,
			executablePath,
		};
	} else {
		puppeteer = await import('puppeteer');
	}

	return await puppeteer.launch(launchOptions);
}

async function getChromiumPath(): Promise<string> {
	// Return cached path if available
	if (cachedExecutablePath) return cachedExecutablePath;

	// Prevent concurrent downloads by reusing the same promise
	if (!downloadPromise) {
		const chromium = (await import('@sparticuz/chromium-min')).default;
		downloadPromise = chromium
			.executablePath(CHROMIUM_PACK_URL)
			.then((path) => {
				cachedExecutablePath = path;
				console.log('Chromium path resolved:', path);
				return path;
			})
			.catch((error) => {
				console.error('Failed to get Chromium path:', error);
				downloadPromise = null; // Reset on error to allow retry
				throw error;
			});
	}

	return downloadPromise;
}
