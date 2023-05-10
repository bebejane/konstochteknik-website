import { error } from '@sveltejs/kit';
import { buildClient } from '@datocms/cma-client';
import { DATOCMS_API_TOKEN, BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD } from '$env/static/private';

const client = buildClient({ apiToken: DATOCMS_API_TOKEN });

export const basicAuth = (req: Request) => {

  const authorization = req.headers.get('authorization')

  if (!authorization)
    throw error(401, 'No authorization header')

  const auth = authorization.split(' ')[1]
  const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':')
  const isAuthorized = user === process.env.BASIC_AUTH_USERNAME && pwd === process.env.BASIC_AUTH_PASSWORD

  if (!isAuthorized)
    throw error(401, 'Unauthorized')

  return true;
}

export const itemFromPayload = async (payload: any): Promise<any> => {
  const modelId = payload?.relationships?.item_type?.data?.id

  if (!modelId)
    throw error(500, 'Model id not found in payload')

  const models = await client.itemTypes.list()
  const model = models.find(m => m.id === modelId)

  if (!model)
    throw error(500, `Model not found with id: ${modelId}`)

  const records = await client.items.list({ filter: { type: model.api_key, fields: { id: { eq: payload.id } } } })
  const record = records[0]

  if (!record)
    throw error(500, `No record found with modelId: ${modelId} (${model.api_key})`)

  return { record, modelApiKey: model.api_key }
}

