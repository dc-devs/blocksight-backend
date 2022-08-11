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
		createdAt
		updatedAt
	}
}`;

export default createQuery;
