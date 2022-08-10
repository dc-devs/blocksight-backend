const findOneQuery = `
query Query($findOneUsersExchangesInput: FindOneUsersExchangesInput!) {
	findOneUsersExchanges(findOneUsersExchangesInput: $findOneUsersExchangesInput) {
		id
		userId
		exchangeId
		apiKey
		apiSecret
		apiPassphrase
		apiNickname
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

export default findOneQuery;
