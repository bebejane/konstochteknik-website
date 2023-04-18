import { AllProjectsDocument } from '$graphql';
import { BYPASS_TOKEN } from '$env/static/private';
import client from '../client'

export const load = (async ({ params }) => {
  const data = await client.request(AllProjectsDocument)
  return {
    allProjects: data.allProjects
  };
})
