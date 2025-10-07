import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import { buildClient } from '@datocms/cma-client-node';

const client = buildClient({ apiToken: process.env.DATOCMS_API_TOKEN as string });

const main = async function () {
	const projects = await client.items.list({
		nested: true,
		version: 'published',
		filter: { type: 'project' },
		limit: 500,
	});
	console.log(projects.length);
	for (const project of projects) {
		console.log(`Updating project ${project.id}...`);
		try {
			await client.items.update(project.id, {
				...project,
			});
		} catch (e) {
			console.log(e);
		}
	}
};
main();
