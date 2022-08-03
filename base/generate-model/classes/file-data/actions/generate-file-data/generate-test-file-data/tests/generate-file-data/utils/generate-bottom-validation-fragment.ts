import { Character } from '../../../../../../../../enums';

const generateBottomValidationFragment = () => {
	let data = '';

	data += '});';
	data += Character.LINE_BREAK;

	return data;
};

export default generateBottomValidationFragment;
