import client from '../client'
import { DATOCMS_PREVIEW_SECRET, BYPASS_TOKEN } from '$env/static/private';
import { AllCommisionersDocument, AllProjectsDocument, AboutDocument } from '$graphql';

export const config = {
  prerender: 'auto',
  isr: {
    expiration: 30,
    bypassToken: BYPASS_TOKEN,
  }
};

export const load = (async ({ cookies }) => {
  const preview = cookies.get('preview') === DATOCMS_PREVIEW_SECRET
  if (preview) {
    client.setHeader('X-Include-Drafts', 'true')
    cookies.delete('preview', { path: '/' })
  } else {
    const headers = { ...client.requestConfig.headers } as { [key: string]: string }
    delete headers['X-Include-Drafts']
    client.requestConfig.headers = headers
  }

  type QueryResult = [{ data: AllCommisionersQuery }, { data: AllProjectsQuery }, { data: AboutQuery }]

  const [{ data: { allCommisioners } }, { data: { allProjects } }, { data: { about } }] = await client.batchRequests<QueryResult>([
    { document: AllCommisionersDocument },
    { document: AllProjectsDocument },
    { document: AboutDocument }
  ])

  return {
    allProjects,
    allCommisioners,
    about
  };
}) 