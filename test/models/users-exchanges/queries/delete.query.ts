const deleteQuery = `
mutation Mutation($deleteUsersExchangesInput: DeleteUsersExchangesInput!) {
	deleteUsersExchanges(deleteUsersExchangesInput: $deleteUsersExchangesInput) {
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

export default deleteQuery;
