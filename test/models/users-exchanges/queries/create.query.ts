const createQuery = `
mutation Mutation($createUsersExchangesInput: CreateUsersExchangesInput!) {
	createUsersExchanges(createUsersExchangesInput: $createUsersExchangesInput) {
		id
		userId
		exchangeId
		createdAt
		updatedAt
		user {
			id
			role
			email
			primaryWalletAddress
			createdAt
			updatedAt
		}
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
}`;

export default createQuery;
