import { AllProjectsDocument } from '$graphql';
import client from '../client'

export const prerender = true

export const load = (async ({ params }) => {
  const data = await client.request(AllProjectsDocument)
  return {
    allProjects: data.allProjects
  };
})

export const POST = (async ({ body }) => {
  return {
    body
  };
}