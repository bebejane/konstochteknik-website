import { AllCommissionsDocument, AllProjectsDocument } from '$graphql';
import client from '../client'

export const prerender = 'auto'

type QueryResult = [{
  data: AllCommissionsQuery,
}, {
  data: AllProjectsQuery,
}]

export const load = (async ({ }) => {

  const [{ data: { allCommisioners } }, { data: { allProjects } }] = await client.batchRequests<QueryResult>([{ document: AllCommissionsDocument }, { document: AllProjectsDocument }])

  return {
    allProjects,
    allCommisioners
  };
}) 