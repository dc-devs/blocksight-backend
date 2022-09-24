const createQuery = `
mutation Mutation($createFiatTransferInput: CreateFiatTransferInput!) {
	createFiatTransfer(createFiatTransferInput: $createFiatTransferInput) {
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

export default createQuery;
