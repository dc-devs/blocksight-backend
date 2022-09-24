const expectedObject = expect.objectContaining({
	id: expect.any(Number),
	type: expect.any(String),
	amount: expect.any(Number),
	currency: expect.any(String),
	timestamp: expect.any(String),
	transferData: expect.any(String),
	exchangeId: expect.any(Number),
	createdAt: expect.any(String),
	updatedAt: expect.any(String),
	exchange: expect.objectContaining({}),
});

export default expectedObject;