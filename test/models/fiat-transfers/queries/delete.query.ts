const deleteQuery = `
mutation Mutation($deleteFiatTransferInput: Int!) {
	deleteFiatTransfer(id: $deleteFiatTransferInput) {
		id
		type
		amount
		currency
		timestamp
		transferData
		exchangeId
		userId
		createdAt
		updatedAt
	}
}`;

export default deleteQuery;
