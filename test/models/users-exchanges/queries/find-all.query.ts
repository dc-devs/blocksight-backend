const findAllQuery = `
query Query($findAllUsersExchangesInput: FindAllUsersExchangesInput!) {
	findAllUsersExchanges(findAllUsersExchangesInput: $findAllUsersExchangesInput) {
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

export default findAllQuery;
