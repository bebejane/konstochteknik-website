import { Browser, LaunchOptions, Page, PuppeteerNode } from 'puppeteer-core';

const CHROMIUM_PACK_URL = process.env.NEXT_PUBLIC_SITE_URL
	? `${process.env.NEXT_PUBLIC_SITE_URL}/chromium-pack.tar`
	: 'https://github.com/gabenunez/puppeteer-on-vercel/raw/refs/heads/main/example/chromium-dont-use-in-prod.tar';

// Cache the Chromium executable path to avoid re-downloading on subsequent requests
let cachedExecutablePath: string | null = null;
let downloadPromise: Promise<string> | null = null;
let browser: Browser | null = null;

export async function getBrowser(): Promise<Browser> {
	if (browser && browser.connected) return browser;

	console.time('getBrowser');
	const isVercel = !!process.env.VERCEL_ENV;
	let puppeteer: PuppeteerNode;
	let launchOptions: LaunchOptions = {
		headless: true,
		defaultViewport: null,
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--disable-dev-shm-usage',
			'--disable-accelerated-2d-canvas',
			'--no-first-run',
			'--no-zygote',
			'--disable-gpu',
			'--disable-extensions',
			'--disable-plugins',
			'--disable-software-rasterizer',
			'--disable-web-security',
			'--js-flags=--max-old-space-size=0 --expose-gc',
		],
	};

	if (isVercel) {
		const chromium = (await import('@sparticuz/chromium')).default;
		puppeteer = (await import('puppeteer-core')) as unknown as PuppeteerNode;

		const executablePath = await getChromiumPath();
		launchOptions = {
			...launchOptions,
			args: chromium.args,
			executablePath,
		};
	} else {
		puppeteer = (await import('puppeteer')) as unknown as PuppeteerNode;
	}

	browser = await puppeteer.launch(launchOptions);
	console.timeEnd('getBrowser');
	return browser;
}

async function getChromiumPath(): Promise<string> {
	// Return cached path if available
	if (cachedExecutablePath) return cachedExecutablePath;

	// Prevent concurrent downloads by reusing the same promise
	if (!downloadPromise) {
		console.log('getChromiumPath', CHROMIUM_PACK_URL);
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
