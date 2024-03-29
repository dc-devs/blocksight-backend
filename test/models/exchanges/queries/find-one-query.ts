const findOneQuery = `
query Query($findOneExchangeInput: FindOneExchangeInput!) {
  findOneExchange(findOneExchangeInput: $findOneExchangeInput) {
    id
    name
    websiteUrl
    logoUrl
    companyLogoUrl
    hasApi
    hasCsv
    createdAt
    updatedAt
    users {
			user {
				id
				email
				primaryWalletAddress
				role
				createdAt
				updatedAt
			}
		}
  }
}`;

export default findOneQuery;
