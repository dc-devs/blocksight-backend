const deleteQuery = `
mutation Mutation($id: Int!) {
	deleteUser(id: $id) {
		id
		email
		primaryWalletAddress
		role
		createdAt
		updatedAt
	}
}`;

export default deleteQuery;
