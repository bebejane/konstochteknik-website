import type { PageServerLoad } from './$types';
import { AllCommissionsDocument, HomeDocument } from '$graphql';
import client from '../client'

export const prerender = true;

export const load = (async ({ params }) => {
  const commissions = await client.request(AllCommissionsDocument)
  const home = await client.request(HomeDocument)
  return {
    data: {
      home,
      commissions
    }
  };
}) 