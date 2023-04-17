import { DATOCMS_PREVIEW_SECRET } from '$env/static/private';
import { AllCommisionersDocument, AllProjectsDocument } from '$graphql';
import client from '../client'

export const prerender = 'auto'

type QueryResult = [{
  data: AllCommisionersQuery,
}, {
  data: AllProjectsQuery,
}]

export const load = (async ({ cookies }) => {

  //cookies.set('preview', DATOCMS_PREVIEW_SECRET, { path: '/', maxAge: 10 })
  const preview = cookies.get('preview') === DATOCMS_PREVIEW_SECRET


  if (preview) {
    client.setHeader('X-Include-Drafts', 'true')
    cookies.delete('preview', { path: '/' })
  } else {
    const headers = { ...client.requestConfig.headers } as { [key: string]: string }
    delete headers['X-Include-Drafts']
    client.requestConfig.headers = headers
  }

  const [{ data: { allCommisioners } }, { data: { allProjects } }] = await client.batchRequests<QueryResult>([
    { document: AllCommisionersDocument },
    { document: AllProjectsDocument }
  ])

  return {
    allProjects,
    allCommisioners
  };
}) 