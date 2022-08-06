const updateQuery = `
mutation Mutation($id: Int!, $data: UpdateUserInput!) {
	updateUser(id: $id, updateUserInput: $data) {
		id
		email
		primaryWalletAddress
		role
		createdAt
		updatedAt
	}
}`;

export default updateQuery;
