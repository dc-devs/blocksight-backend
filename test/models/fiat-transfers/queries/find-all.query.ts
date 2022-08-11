const findAllQuery = `
query Query($findAllFiatTransferInput: FindAllFiatTransferInput!) {
	findAllFiatTransfer(findAllFiatTransferInput: $findAllFiatTransferInput) {
		id
		type
		amount
		currency
		timestamp
		transferData
		exchangeId
		createdAt
		updatedAt
		exchange {
			id
			name
			websiteUrl
			logoUrl
			companyLogoUrl
			hasApi
			hasCsv
			createdAt
			updatedAt
		}
	}
}`;

export default findAllQuery;
