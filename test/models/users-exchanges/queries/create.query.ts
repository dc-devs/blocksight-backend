const createQuery = `
mutation Mutation($createUsersExchangesInput: CreateUsersExchangesInput!) {
	createUsersExchanges(createUsersExchangesInput: $createUsersExchangesInput) {
		id
		userId
		exchangeId
		createdAt
		updatedAt
		User {
			id
			role
			email
			primaryWalletAddress
			createdAt
			updatedAt
		}
		Exchange {
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
}`;

export default createQuery;
