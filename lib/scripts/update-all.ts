import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import { buildClient } from '@datocms/cma-client-node';

const client = buildClient({ apiToken: process.env.DATOCMS_API_TOKEN as string });

const main = async function () {
	const projects = [];

	for await (const record of client.items.listPagedIterator({
		nested: true,
		version: 'published',
		filter: { type: 'project' },
	})) {
		projects.push(record);
	}

	console.log(projects.length);

	for (const project of projects) {
		console.log(`Updating project ${project.id}...`);
		try {
			await client.items.update(project.id, {
				...project,
				thumbnail: null,
			});
		} catch (e) {
			console.log(e);
		}
	}
};
main();
