import { json, text } from '@sveltejs/kit';
import { DATOCMS_PREVIEW_SECRET } from '$env/static/private';

export async function POST({ request, setHeaders }) {

  setHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  });

  const body = await request.json();
  const url = await generatePreviewUrl(body);
  const baseUrl = 'https://konstochteknik.vercel.app'

  const previewLinks = !url ? [] : [{
    label: 'Live',
    url: `${baseUrl}${url}`
  }, {
    label: 'Draft',
    url: `${baseUrl}/api/preview?slug=${url}&secret=${DATOCMS_PREVIEW_SECRET}`,
  }]

  return json({ previewLinks });
}

const generatePreviewUrl = async ({ item, itemType }: any) => {

  let path = null;

  const { slug } = item.attributes

  switch (itemType.attributes.api_key) {
    case 'project':
      path = `/projects/${slug}`
      break;
    default:
      break;
  }
  return path
}

export async function OPTIONS({ request, setHeaders }) {
  setHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  });
  return text('ok')
}