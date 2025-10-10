import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import { buildClient } from '@datocms/cma-client-node';
import { Project } from '@/@types/datcms-cma';

const client = buildClient({ apiToken: process.env.DATOCMS_API_TOKEN as string });

const main = async function () {
	const projects: any[] = [];

	const id = process.argv[2] ?? null;

	for await (const record of client.items.listPagedIterator({
		nested: true,
		version: 'published',
		filter: { type: 'project' },
	})) {
		if (id !== null) {
			id === record.id && projects.push(record);
		} else {
			projects.push(record);
		}
	}

	console.log(`Found ${projects.length} projects.`);

	for (const project of projects) {
		console.log(`Updating project: ${project.id}`);

		try {
			await client.items.update(project.id, {
				...project,
				thumbnail: null,
			});
			await client.items.publish(project.id);
			if (project.thumbnail?.upload_id) await client.uploads.destroy(project.thumbnail.upload_id);
		} catch (e) {
			console.log(e);
		}
	}
};
main();
