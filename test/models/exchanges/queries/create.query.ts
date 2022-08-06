const createQuery = `
mutation Mutation($createExchangeInput: CreateExchangeInput!) {
  createExchange(createExchangeInput: $createExchangeInput) {
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

export default createQuery;
