const updateQuery = `
mutation Mutation($id: Int!, $updateUsersExchangesInput: UpdateUsersExchangesInput!) {
  updateUsersExchanges(id: $id, updateUsersExchangesInput: $updateUsersExchangesInput) {
		id
		userId
		exchangeId
		createdAt
		updatedAt
	}
}`;

export default updateQuery;
