import { webPreviews, cors } from 'next-dato-utils/route-handlers'
import { buildRoute } from '@lib/routes';
import { NextRequest } from 'next/server';

export const runtime = "edge"
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  return await webPreviews(req, async ({ item, itemType }) => {
    const paths = await buildRoute(itemType.attributes.api_key, item.attributes)
    if (!paths) return null
    return `${Array.isArray(paths) ? paths : [paths]}?secret=${process.env.DATOCMS_PREVIEW_SECRET}`
  })
}

export async function OPTIONS(req: Request) {

  return await cors(req, new Response('ok', { status: 200 }), {
    origin: '*',
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false
  })
}