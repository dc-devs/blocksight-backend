import { Character } from '../enums';

const generateBottomClassFragment = () => {
	let data = '';

	data += `};`;
	data += Character.LINE_BREAK;

	return data;
};

export default generateBottomClassFragment;
