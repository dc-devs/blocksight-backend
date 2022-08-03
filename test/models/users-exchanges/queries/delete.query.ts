const deleteQuery = `
mutation Mutation($deleteUsersExchangesInput: DeleteUsersExchangesInput!) {
	deleteUsersExchanges(deleteUsersExchangesInput: $deleteUsersExchangesInput) {
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

export default deleteQuery;
