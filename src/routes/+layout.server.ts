import { DATOCMS_PREVIEW_SECRET } from '$env/static/private';
import { AllCommissionsDocument, AllProjectsDocument } from '$graphql';
import client from '../client'

export const prerender = 'auto'

type QueryResult = [{
  data: AllCommissionsQuery,
}, {
  data: AllProjectsQuery,
}]

export const load = (async ({ cookies }) => {

  const preview = cookies.get('preview') === DATOCMS_PREVIEW_SECRET

  if (preview)
    client.setHeader('X-Include-Drafts', 'true')

  const [{ data: { allCommisioners } }, { data: { allProjects } }] = await client.batchRequests<QueryResult>([{ document: AllCommissionsDocument }, { document: AllProjectsDocument }])

  return {
    allProjects,
    allCommisioners
  };
}) 