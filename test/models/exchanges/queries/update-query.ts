const update = `
mutation Mutation($updateExchangeId: Int!, $updateExchangeInput: UpdateExchangeInput!) {
  updateExchange(id: $updateExchangeId, updateExchangeInput: $updateExchangeInput) {
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

export default update;
