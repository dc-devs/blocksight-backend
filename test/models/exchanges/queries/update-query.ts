const update = `
mutation Mutation($id: Int!, $updateExchangeInput: UpdateExchangeInput!) {
  updateExchange(id: $id, updateExchangeInput: $updateExchangeInput) {
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
}`;

export default update;
