const findOneQuery = `
query Query($findOneFiatTransferInput: FindOneFiatTransferInput!) {
	findOneFiatTransfer(findOneFiatTransferInput: $findOneFiatTransferInput) {
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

export default findOneQuery;
