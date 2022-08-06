const deleteQuery = `mutation Mutation($id: Int!) {
  deleteExchange(id: $id) {
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

export default deleteQuery;
