import { json, text } from '@sveltejs/kit';
import { DATOCMS_PREVIEW_SECRET } from '$env/static/private';

export async function POST({ request, setHeaders }) {
  setHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  });

  if (request.method === 'OPTIONS') return text('ok');

  const body = await request.json();
  console.log(body)

  const url = await generatePreviewUrl(body);
  const baseUrl = 'https://konstochteknik.vercel.app'

  const previewLinks = !url ? [] : [{
    label: 'Live',
    url: `${baseUrl}${url}`
  }, {
    label: 'Utkast',
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
  console.log(path)

  return path
}