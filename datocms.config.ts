import { DatoCmsConfig, getUploadReferenceRoutes } from 'next-dato-utils/config';
import { MetadataRoute } from 'next';

const config = {
	routes: {
		project: async ({ id, slug }) => ['/', `/screenshot/${id}`],
		about: async () => ['/'],
		commisioner: async () => ['/'],
		upload: async ({ id }) => getUploadReferenceRoutes(id),
	},
	sitemap: async () => {
		return ['/'].map((p) => ({
			url: `${process.env.NEXT_PUBLIC_SITE_URL}${p}`,
			lastModified: new Date().toISOString(),
			changeFrequency: 'weekly',
			priority: 0.8,
		})) as MetadataRoute.Sitemap;
	},
	manifest: async () => {
		return {
			name: 'Konst & Teknik',
			short_name: 'K&T',
			description: 'Konst & Teknik Website',
			start_url: '/',
			display: 'standalone',
			background_color: '#ffffff',
			theme_color: '#000000',
			icons: [
				{
					src: '/favicon.ico',
					sizes: 'any',
					type: 'image/x-icon',
				},
			],
		} satisfies MetadataRoute.Manifest;
	},
	robots: async () => {
		return {
			rules: {
				userAgent: '*',
				allow: '/',
				disallow: '/screenshot*',
			},
		};
	},
} satisfies DatoCmsConfig;

export default config;
