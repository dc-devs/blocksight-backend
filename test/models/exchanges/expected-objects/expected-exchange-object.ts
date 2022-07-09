const expectedUserObject = expect.objectContaining({
	id: expect.any(Number),
	name: expect.any(String),
	websiteUrl: expect.any(String),
	logoUrl: expect.any(String),
	companyLogoUrl: expect.any(String),
	hasApi: expect.any(Boolean),
	hasCsv: expect.any(Boolean),
	createdAt: expect.any(String),
	updatedAt: expect.any(String),
});

export default expectedUserObject;
