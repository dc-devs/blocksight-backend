const createQuery = `
mutation Mutation($createExchangeInput: CreateExchangeInput!) {
  createExchange(createExchangeInput: $createExchangeInput) {
    id
    name
    websiteUrl
    logoUrl
    companyLogoUrl
    users {
      id
      email
      primaryWalletAddress
      role
      createdAt
      updatedAt
    }
    hasApi
    hasCsv
    createdAt
    updatedAt
  }
}`;

export default createQuery;
