import { AllCommissionsDocument, HomeDocument } from '$graphql';
import client from '../client'

export const prerender = 'auto'

export const load = (async ({ }) => {
  const { allCommisioners } = await client.request(AllCommissionsDocument)
  const { allProjects } = await client.request(HomeDocument)
  return {
    allProjects,
    allCommisioners
  };
}) 