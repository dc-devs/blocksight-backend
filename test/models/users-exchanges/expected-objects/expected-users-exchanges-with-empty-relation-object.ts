const expectedObject = expect.objectContaining({
	id: expect.any(Number),
	userId: expect.any(Number),
	exchangeId: expect.any(Number),
	createdAt: expect.any(String),
	updatedAt: expect.any(String),
	user: expect.objectContaining({}),
	exchange: expect.objectContaining({}),
});

export default expectedObject;
