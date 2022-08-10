import expectedUserObject from '../../users/expected-objects/expected-user-object';
import expectedExchangeObject from '../../exchanges/expected-objects/expected-exchange-object';

const expectedObject = expect.objectContaining({
	id: expect.any(Number),
	userId: expect.any(Number),
	exchangeId: expect.any(Number),
	apiKey: expect.any(String),
	apiSecret: expect.any(String),
	apiPassphrase: expect.any(String),
	apiNickname: expect.any(String),
	createdAt: expect.any(String),
	updatedAt: expect.any(String),
	user: expectedUserObject,
	exchange: expectedExchangeObject,
});

export default expectedObject;
