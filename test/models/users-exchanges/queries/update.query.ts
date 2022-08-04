const updateQuery = `
mutation Mutation($updateUsersExchangesInput: UpdateUsersExchangesInput!) {
	updateUsersExchanges(updateUsersExchangesInput: $updateUsersExchangesInput) {
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

export default updateQuery;
