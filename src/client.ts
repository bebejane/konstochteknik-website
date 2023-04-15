import { GraphQLClient } from 'graphql-request'
import { PUBLIC_DATOCMS_API_TOKEN } from '$env/static/public';
import { DATOCMS_ENVIRONMENT } from '$env/static/private';

export default new GraphQLClient('https://graphql.datocms.com', {
	headers: {
		Authorization: `Bearer ${PUBLIC_DATOCMS_API_TOKEN}`,
		'Content-Type': 'application/json',
		'X-Exclude-Invalid': 'true',
		'X-Environment': DATOCMS_ENVIRONMENT ?? 'main'
	},
})