import { json } from '@sveltejs/kit';
import { BYPASS_TOKEN } from '$env/static/private';
import { itemFromPayload, basicAuth } from './utils';
import type { EdgeConfig } from '@sveltejs/adapter-vercel';

export const config: EdgeConfig = {
  runtime: 'edge',
  regions: 'all',
  //envVarsInUse: [BYPASS_TOKEN, BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD, DATOCMS_API_TOKEN]
};

export async function POST({ request, fetch }) {

  basicAuth(request)

  const { entity } = await request.json();
  const { record, modelApiKey } = await itemFromPayload(entity)
  let paths = ['/'];

  switch (modelApiKey) {
    case 'project':
      paths.push(`/projects/${record.slug}`)
      break;
    default:
      break;
  }

  if (paths.length) {
    await Promise.all(paths.map(path => fetch(path, { method: 'GET', headers: { 'x-prerender-revalidate': BYPASS_TOKEN } })))
    console.log('revalidated', paths)
  }

  return json({ paths })
}

