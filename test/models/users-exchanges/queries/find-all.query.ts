const findAllQuery = `
query Query($findAllUsersExchangesInput: FindAllUsersExchangesInput!) {
	findAllUsersExchanges(findAllUsersExchangesInput: $findAllUsersExchangesInput) {
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

export default findAllQuery;
