const updateQuery = `
mutation Mutation($id: Int!, $updateUsersExchangesInput: UpdateUsersExchangesInput!) {
  updateUsersExchanges(id: $id, updateUsersExchangesInput: $updateUsersExchangesInput) {
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

export default updateQuery;
