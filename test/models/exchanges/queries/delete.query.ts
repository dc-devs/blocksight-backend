const deleteQuery = `mutation Mutation($id: Int!) {
  deleteExchange(id: $id) {
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

export default deleteQuery;
