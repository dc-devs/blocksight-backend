const expectedUserObject = expect.objectContaining({
	id: expect.any(Number),
	email: expect.any(String),
	primaryWalletAddress: expect.any(String),
	role: expect.any(String),
	createdAt: expect.any(String),
	updatedAt: expect.any(String),
});

export default expectedUserObject;
