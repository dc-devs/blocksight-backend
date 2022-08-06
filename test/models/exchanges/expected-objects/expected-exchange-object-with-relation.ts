import expectedUserObject from '../../users/expected-objects/expected-user-object';

const expectedExchangeObject = expect.objectContaining({
	id: expect.any(Number),
	name: expect.any(String),
	websiteUrl: expect.any(String),
	logoUrl: expect.any(String),
	companyLogoUrl: expect.any(String),
	hasApi: expect.any(Boolean),
	hasCsv: expect.any(Boolean),
	createdAt: expect.any(String),
	updatedAt: expect.any(String),
	users: expect.arrayContaining([
		expect.objectContaining({
			user: expectedUserObject,
		}),
	]),
});

export default expectedExchangeObject;
