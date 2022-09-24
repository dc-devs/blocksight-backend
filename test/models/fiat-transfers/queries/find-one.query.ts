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

export default findOneQuery;
