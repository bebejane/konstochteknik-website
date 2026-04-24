import 'dotenv/config';
import { buildClient } from '@datocms/cma-client-node';
import { Project } from '@/types/datocms-cma';
import { ItemInNestedResponse } from '@datocms/cma-client/dist/types/generated/ApiTypes';

const client = buildClient({ apiToken: process.env.DATOCMS_API_TOKEN as string });

const main = async function () {
	const projects: ItemInNestedResponse<Project>[] = [];

	const id = process.argv[2] ?? null;

	for await (const record of client.items.listPagedIterator<Project>({
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
		console.log(`Updating project: ${project.title}`);

		try {
			await client.items.update(project.id, {
				...project,
				thumbnail: null,
				thumbnail_mobile: null,
			});
			await client.items.publish(project.id);
			if (project.thumbnail?.upload_id) await client.uploads.destroy(project.thumbnail.upload_id);
			if (project.thumbnail_mobile?.upload_id)
				await client.uploads.destroy(project.thumbnail_mobile.upload_id);
		} catch (e) {
			console.log(e);
		}
	}
};
main();
