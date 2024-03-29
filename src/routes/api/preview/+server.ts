import { error } from '@sveltejs/kit';
import { DATOCMS_PREVIEW_SECRET } from '$env/static/private';
import * as cookie from 'cookie';

export async function GET({ url, cookies }) {
  const slug = url.searchParams.get('slug')
  const secret = url.searchParams.get('secret')

  if (secret !== DATOCMS_PREVIEW_SECRET)
    throw error(401, 'Unauthorized')

  if (!slug)
    throw error(500, 'No slug provided')

  cookies.set('preview', DATOCMS_PREVIEW_SECRET, { path: '/', maxAge: 10 })

  console.log('preview mode', DATOCMS_PREVIEW_SECRET, secret, slug)

  const headers = new Headers({
    'Set-Cookie': cookie.serialize('preview', DATOCMS_PREVIEW_SECRET, { path: '/', maxAge: 10 }),
    location: slug,
  })

  const response = new Response(null, {
    status: 307,
    headers,
  })

  return response
}