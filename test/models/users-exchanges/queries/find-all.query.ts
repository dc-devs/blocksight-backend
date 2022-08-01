const findAllQuery = `
query Query($findAllUsersExchangesInput: FindAllUsersExchangesInput!) {
	findAllUsersExchanges(findAllUsersExchangesInput: $findAllUsersExchangesInput) {
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

export default findAllQuery;
