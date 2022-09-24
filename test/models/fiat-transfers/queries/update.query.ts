const updateQuery = `
mutation Mutation($id: Int!, $updateFiatTransferInput: UpdateFiatTransferInput!) {
  updateFiatTransfer(id: $id, updateFiatTransferInput: $updateFiatTransferInput) {
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

export default updateQuery;
