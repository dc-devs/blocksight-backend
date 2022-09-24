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
		userId
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
		user {
			id
			email
			primaryWalletAddress
			role
			createdAt
			updatedAt
		}
	}
}`;

export default findAllQuery;
