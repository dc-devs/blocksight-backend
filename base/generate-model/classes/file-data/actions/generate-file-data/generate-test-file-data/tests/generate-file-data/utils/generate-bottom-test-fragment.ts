import { Character } from '../../../../../../../../enums';

interface IProps {
	testName: string;
}

const generateBottomTestFragment = ({ testName }: IProps) => {
	let data = '';

	data += `});` + Character.LINE_BREAK;
	data += `};` + Character.LINE_BREAK;
	data += Character.LINE_BREAK;
	data += `export default run${testName}Tests;`;

	return data;
};

export default generateBottomTestFragment;
