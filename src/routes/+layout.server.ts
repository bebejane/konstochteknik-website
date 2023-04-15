import { AllCommissionsDocument, HomeDocument } from '$graphql';
import client from '../client'

export const prerender = 'auto'

type QueryResult = [{
  data: AllCommissionsQuery,
}, {
  data: HomeQuery,
}]

export const load = (async ({ }) => {

  const [{ data: { allCommisioners } }, { data: { allProjects } }] = await client.batchRequests<QueryResult>([{ document: AllCommissionsDocument }, { document: HomeDocument }])

  return {
    allProjects,
    allCommisioners
  };
}) 