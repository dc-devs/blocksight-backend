const deleteQuery = `
mutation Mutation($deleteUsersExchangesInput: Int!) {
	deleteUsersExchanges(id: $deleteUsersExchangesInput) {
		id
		userId
		exchangeId
		createdAt
		updatedAt
	}
}`;

export default deleteQuery;
