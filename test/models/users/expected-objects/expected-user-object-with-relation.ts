import expectedExchangeObject from '../../exchanges/expected-objects/expected-exchange-object';

const expectedUserObject = expect.objectContaining({
	id: expect.any(Number),
	email: expect.any(String),
	primaryWalletAddress: expect.any(String),
	role: expect.any(String),
	createdAt: expect.any(String),
	updatedAt: expect.any(String),
	exchanges: expect.arrayContaining([
		expect.objectContaining({
			exchange: expectedExchangeObject,
		}),
	]),
});

export default expectedUserObject;
