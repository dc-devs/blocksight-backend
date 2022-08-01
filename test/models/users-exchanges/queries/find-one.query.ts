const findOneQuery = `
query Query($findOneUsersExchangesInput: FindOneUsersExchangesInput!) {
	findOneUsersExchanges(findOneUsersExchangesInput: $findOneUsersExchangesInput) {
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

export default findOneQuery;
