import { HomeDocument } from '$graphql';
import client from '../client'

export const prerender = 'auto'

export const load = (async ({ params }) => {
  const data = await client.request(HomeDocument)
  return {
    allProjects: data.allProjects
  };
})