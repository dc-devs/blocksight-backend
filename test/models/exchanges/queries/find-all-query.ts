const findAllQuery = `
query Query($findAllExchangesInput: FindAllExchangesInput!) {
	findAllExchanges(findAllExchangesInput: $findAllExchangesInput) {
		id
		name
		websiteUrl
		logoUrl
		companyLogoUrl
		hasApi
		hasCsv
		users {
			id
			email
			primaryWalletAddress
			role
			createdAt
			updatedAt
		}
		createdAt
		updatedAt
	}
}`;

export default findAllQuery;
