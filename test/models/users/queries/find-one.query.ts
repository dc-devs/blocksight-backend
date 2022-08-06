const findOneQuery = `
query Query($findOneUserInput: FindOneUserInput!) {
	findOneUser(findOneUserInput: $findOneUserInput) {
		id
		role
		email
		primaryWalletAddress
		createdAt
		updatedAt
	}
}`;

export default findOneQuery;
