import type { PageServerLoad } from './$types';
import { HomeDocument } from '$graphql';
import client from '../client'

export const prerender = true;

export const load = (async ({ params }) => {
  const data = await client.request<HomeQuery>(HomeDocument)
  return {
    data
  };
}) satisfies PageServerLoad;