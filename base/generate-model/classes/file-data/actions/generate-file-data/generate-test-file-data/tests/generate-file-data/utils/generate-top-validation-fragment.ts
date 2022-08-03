import { Character } from '../../../../../../../../enums';

const generateTopValidationFragment = () => {
	let data = '';

	data += `describe('validation', () => {`;
	data += Character.LINE_BREAK;

	return data;
};

export default generateTopValidationFragment;
