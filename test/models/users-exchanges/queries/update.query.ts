const updateQuery = `
mutation Mutation($id: Int!, $updateUsersExchangesInput: UpdateUsersExchangesInput!) {
  updateUsersExchanges(id: $id, updateUsersExchangesInput: $updateUsersExchangesInput) {
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

export default updateQuery;
