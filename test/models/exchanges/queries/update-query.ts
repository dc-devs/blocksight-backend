const update = `
mutation Mutation($id: Int!, $updateExchangeInput: UpdateExchangeInput!) {
  updateExchange(id: $id, updateExchangeInput: $updateExchangeInput) {
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
