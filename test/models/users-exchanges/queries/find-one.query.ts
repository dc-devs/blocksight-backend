const findOneQuery = `
query Query($findOneUsersExchangesInput: FindOneUsersExchangesInput!) {
	findOneUsersExchanges(findOneUsersExchangesInput: $findOneUsersExchangesInput) {
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

export default findOneQuery;
