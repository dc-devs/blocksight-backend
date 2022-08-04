const deleteQuery = `
mutation Mutation($deleteUsersExchangesInput: DeleteUsersExchangesInput!) {
	deleteUsersExchanges(deleteUsersExchangesInput: $deleteUsersExchangesInput) {
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

export default deleteQuery;
