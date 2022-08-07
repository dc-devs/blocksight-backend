const createQuery = `
mutation Mutation($createUsersExchangesInput: CreateUsersExchangesInput!) {
	createUsersExchanges(createUsersExchangesInput: $createUsersExchangesInput) {
		id
		userId
		exchangeId
		createdAt
		updatedAt
	}
}`;

export default createQuery;
