import { revalidate } from 'next-dato-utils/route-handlers';
import { buildRoute } from '@lib/routes';

export const runtime = "edge"
export const dynamic = "force-dynamic"

export async function POST(req: Request) {

  return await revalidate(req, async (payload, revalidate) => {

    const { api_key, entity, event_type, entity_type } = payload;
    const { id, attributes: { slug } } = entity
    const tags: string[] = [api_key, id].filter(t => t)
    const paths = await buildRoute(api_key, entity.attributes)
    return await revalidate(Array.isArray(paths) ? paths : [paths], tags, true)
  })
}