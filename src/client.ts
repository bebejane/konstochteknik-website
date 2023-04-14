import { HoudiniClient } from '$houdini';
import { PUBLIC_DATOCMS_API_TOKEN } from '$env/static/public';

export default new HoudiniClient({
	url: 'https://graphql.datocms.com',
	fetchParams({ text: query = '', variables = {} }) {
		return {
			headers: {
				Authorization: `Bearer ${PUBLIC_DATOCMS_API_TOKEN}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query,
				variables
			})
		}
	}
})