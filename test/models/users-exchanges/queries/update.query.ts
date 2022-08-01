const updateQuery = `
mutation Mutation($updateUsersExchangesInput: UpdateUsersExchangesInput!) {
	updateUsersExchanges(updateUsersExchangesInput: $updateUsersExchangesInput) {
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

export default updateQuery;
