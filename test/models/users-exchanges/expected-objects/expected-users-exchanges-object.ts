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
});

export default expectedObject;
