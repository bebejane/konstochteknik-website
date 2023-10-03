import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const config = {
	dedupeOperationSuffix: true,
	dedupeFragments: true,
	pureMagicComment: false,
	exportFragmentSpreadSubTypes: true,
	namingConvention: "keep",
	skipDocumentsValidation: false,
	exposeQueryKeys: true,
	useTypeImports: true,
}

module.exports = {
	schema: {
		"https://graphql.datocms.com": {
			headers: {
				Authorization: process.env.PUBLIC_DATOCMS_API_TOKEN,
				"X-Exclude-Invalid": true,
			},
		},
	},
	documents: "src/lib/graphql/**/*.gql",
	extensions: {
		codegen: {
			overwrite: true,
			generates: {
				"src/datocms.d.ts": {
					plugins: ["typescript", "typescript-operations"],
					config: { ...config, noExport: true },
				},
				"src/lib/graphql/index.ts": {
					plugins: ["typed-document-node"],
					config,
				}
			},
		},
	},
};
