const findOneQuery = `
query Query($findOneUserInput: FindOneUserInput!) {
	findOneUser(findOneUserInput: $findOneUserInput) {
		id
		role
		email
		primaryWalletAddress
		createdAt
		updatedAt
		exchanges {
			exchange {
				id
				name
				websiteUrl
				logoUrl
				companyLogoUrl
				hasApi
				hasCsv
				createdAt
				updatedAt
			}
		}
	}
}`;

export default findOneQuery;
