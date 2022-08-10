const deleteQuery = `
mutation Mutation($deleteUsersExchangesInput: Int!) {
	deleteUsersExchanges(id: $deleteUsersExchangesInput) {
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

export default deleteQuery;
