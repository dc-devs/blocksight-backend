import { Character } from '../../../../../../../../enums';

interface IProps {
	crudOperation: string;
}

const generateTopQueryFragment = ({ crudOperation }: IProps) => {
	let data = '';

	data += Character.TAB + `}` + Character.LINE_BREAK;
	data += `}\`` + Character.LINE_BREAK;
	data += Character.LINE_BREAK;
	data += `export default ${crudOperation};` + Character.LINE_BREAK;

	return data;
};

export default generateTopQueryFragment;
