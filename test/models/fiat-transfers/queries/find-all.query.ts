const findAllQuery = `
query Query($findAllFiatTransfersInput: FindAllFiatTransfersInput!) {
	findAllFiatTransfers(findAllFiatTransfersInput: $findAllFiatTransfersInput) {
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
