const expectedObject = expect.objectContaining({
	id: expect.any(Number),
	userId: expect.any(Number),
	exchangeId: expect.any(Number),
	createdAt: expect.any(Date),
	updatedAt: expect.any(Date),
});

export default expectedObject;
