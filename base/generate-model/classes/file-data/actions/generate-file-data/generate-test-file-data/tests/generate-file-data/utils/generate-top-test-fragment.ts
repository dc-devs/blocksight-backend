import { Character } from '../../../../../../../../enums';

interface IProps {
	testName: string;
}

const generateTopTestFragment = ({ testName }: IProps) => {
	let data = '';

	data += `const run${testName}Tests = () => {
	describe('${testName}', () => {
		let app: INestApplication;

		beforeAll(async () => {
			if (testApp) {
				app = testApp;
			} else {
				app = await initializeTestApp();
			}
		});

`;

	data += Character.LINE_BREAK;

	return data;
};

export default generateTopTestFragment;
