const createQuery = `
mutation Mutation($createUsersExchangesInput: CreateUsersExchangesInput!) {
	createUsersExchanges(createUsersExchangesInput: $createUsersExchangesInput) {
		id
		userId
		exchangeId
		createdAt
		updatedAt
		users {
			id
			role
			email
			primaryWalletAddress
			createdAt
			updatedAt
		}
		exchanges {
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
