/// <references types="houdini-svelte">
//import * as dotenv from "dotenv"; dotenv.config({ path: "./.env" });

/** @type {import('houdini').ConfigFile} */
const config = {
	watchSchema: {
		url: "https://graphql.datocms.com/",
		headers: {
			Authorization(env) {
				return `Bearer ${env.PUBLIC_DATOCMS_API_TOKEN}`;
			},
		},
	},

	plugins: {
		"houdini-svelte": {},
	},
	scalars: {
		MetaTagAttributes: {
			type: "Record<string, string>",
		},
		Date: {
			type: "string",
		},
		IntType: {
			type: "number",
		},
		JsonField: {
			type: "unkown",
		},
		ItemId: {
			type: "string",
		},
		FloatType: {
			type: "number",
		},
		UploadId: {
			type: "string",
		},
	},
};

export default config;
