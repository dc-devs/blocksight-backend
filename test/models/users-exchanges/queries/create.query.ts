const createQuery = `
mutation Mutation($createUsersExchangesInput: CreateUsersExchangesInput!) {
	createUsersExchanges(createUsersExchangesInput: $createUsersExchangesInput) {
		id
		userId
		exchangeId
		apiKey
		apiSecret
		apiPassphrase
		apiNickname
		createdAt
		updatedAt
	}
}`;

export default createQuery;
