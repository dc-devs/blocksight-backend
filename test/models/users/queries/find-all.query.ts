const findAllQuery = `
query Query($findAllUsersInput: FindAllUsersInput!) {
	findAllUsers(findAllUsersInput: $findAllUsersInput) {
		id
		role
		email
		primaryWalletAddress
		createdAt
		updatedAt
	}
}`;

export default findAllQuery;
