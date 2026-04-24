import { NextRequest, NextResponse } from 'next/server';
import { sleep } from 'next-dato-utils/utils';
import { revalidatePath } from 'next/cache';
import config from '@/datocms.config';
import client from '@/lib/client';
import fs from 'fs';
import { Project } from '@/types/datocms-cma';
import hash from 'object-hash';
import { uploadLocalFileAndReturnPath, type ApiTypes } from '@datocms/cma-client-node';
import { Item } from '@datocms/cma-client/dist/types/generated/ApiTypes';
import { waitUntil } from '@vercel/functions';
import { getBrowser } from '@/lib/puppeteer';

export async function POST(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const { entity } = await request.json();
		const id = entity ? entity.id : searchParams.get('id');

		console.log('screenshot api route:', id);

		if (!id) return new NextResponse('Please provide a id.', { status: 400 });

		const record = await client.items.find<Project>(id, { version: 'published' });

		if (!record) return new NextResponse('Record not found', { status: 404 });

		const recordHash = hash({
			...record,
			meta: undefined,
			thumbnail: undefined,
		});

		const recordHashMobile = hash({
			...record,
			meta: undefined,
			thumbnail_mobile: undefined,
		});

		const thumbnail = (record.thumbnail as any)?.upload_id
			? await client.uploads.find((record.thumbnail as any)?.upload_id as string)
			: null;
		const thumbnailMobile = (record.thumbnail_mobile as any)?.upload_id
			? await client.uploads.find((record.thumbnail_mobile as any)?.upload_id as string)
			: null;

		const currentHash = thumbnail?.default_field_metadata?.en?.custom_data.hash;
		const currentHashMobile = thumbnailMobile?.default_field_metadata?.en?.custom_data.hash;

		if (currentHash === recordHash && currentHashMobile === recordHashMobile) {
			console.log('screenshot', 'skip since the same');
			return new NextResponse('skip', { status: 200 });
		}

		waitUntil(
			new Promise(async (resolve, reject) => {
				try {
					if (currentHash !== recordHash)
						await generate(record, recordHash, 'thumbnail', {
							width: 1920,
							height: 1080,
						});
					if (currentHashMobile !== recordHashMobile)
						await generate(record, recordHashMobile, 'thumbnail_mobile', {
							width: 414,
							height: 896,
						});
					resolve({ success: true });
				} catch (e) {
					console.error(e);
					reject({ success: false, error: e?.message || e });
				}
			})
				.then((res) => {
					console.log('done');
					console.log(res);
				})
				.catch((e) => {
					console.error(e);
				}),
		);

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
	}
}

async function generate(
	record: Item<Project>,
	recordHash: string,
	key: string,
	viewport: { width: number; height: number },
) {
	const url = `${process.env.NEXT_PUBLIC_SITE_URL}/screenshot/${record.id}`;
	const filename = `${record.slug}-screenshot.png`;
	const filePath = `/tmp/${filename}`;
	const title = `${record.title}`;

	console.log('generate screenshot', url);

	const browser = await getBrowser();
	const page = await browser.newPage();
	await page.setViewport(viewport);
	await page.goto(url, { waitUntil: 'domcontentloaded' });
	await sleep(2000);
	const screenshot = await page.screenshot({ type: 'png', fullPage: true, optimizeForSpeed: true });
	await sleep(1000);

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

	if (record[key]?.upload_id) {
		const uploadId = record[key]?.upload_id;
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

	fs.unlinkSync(filePath);
	await client.items.update(record.id, { [key]: { upload_id: upload.id } });
	await client.items.publish(record.id);
	await page.close();
}
