interface IProps {
	testName: string;
}

const generateTopTestFragment = ({ testName }: IProps) => {
	let data = '';

	data += `const run${testName}Tests = () => {
	describe('${testName}', () => {
		let app: INestApplication;

		beforeAll(async () => {
			app = await initializeTestApp();
		});

		afterAll(async () => {
			await redisClient.disconnect();
			await app.close();
		});`;

	return data;
};

export default generateTopTestFragment;