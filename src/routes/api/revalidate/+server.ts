import { json } from '@sveltejs/kit';
import { BYPASS_TOKEN } from '$env/static/private';
import { itemFromPayload, basicAuth } from './utils';

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

