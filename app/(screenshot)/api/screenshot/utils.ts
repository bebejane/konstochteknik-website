export async function updaateScreenshot(id: string, screenshot: string) {
	const record = await client.items.find(id);

	if (!record) return new NextResponse('Record not found', { status: 404 });

	const recordHash = hash({ ...record, meta: undefined, thumbnail: undefined });
	const thumbnail = (record.thumbnail as any)?.upload_id
		? await client.uploads.find((record.thumbnail as any)?.upload_id as string)
		: null;

	if (thumbnail?.default_field_metadata?.en?.custom_data.hash === recordHash)
		return new NextResponse('skip', { status: 200 });

	const url = `${process.env.NEXT_PUBLIC_SITE_URL}/screenshot/${record.id}`;

	let browser;
	try {
		const isVercel = !!process.env.VERCEL_ENV;
		let puppeteer: any,
			launchOptions: any = {
				headless: true,
			};

		if (isVercel) {
			const chromium = (await import('@sparticuz/chromium')).default;
			puppeteer = await import('puppeteer-core');
			launchOptions = {
				...launchOptions,
				args: chromium.args,
				executablePath: await chromium.executablePath(),
			};
		} else {
			puppeteer = await import('puppeteer');
		}

		browser = await puppeteer.launch(launchOptions);

		const page = await browser.newPage();
		await page.setViewport({ width, height });
		await page.goto(url, { waitUntil: 'networkidle2' });
		const screenshot = await page.screenshot({ type: 'png' });
		const filename = `${record.slug}-screenshot.png`;
		const filePath = `/tmp/${filename}`;
		const title = `${record.title} (screenshot)`;

		fs.writeFileSync(filePath, screenshot);

		const upload = await client.uploads.createFromLocalFile({
			localPath: filePath,
			default_field_metadata: {
				en: {
					title,
					alt: title,
					custom_data: {
						hash: recordHash,
					},
				},
			},
		});

		await client.items.update(record.id, {
			thumbnail: { upload_id: upload.id },
		});

		return new NextResponse('ok', { status: 200 });
	} catch (error) {
		console.error(error);
		return new NextResponse('An error occurred while generating the screenshot.', { status: 500 });
	} finally {
		if (browser) {
			await browser.close();
		}
	}
}
