import { Character, InputType } from '../enums';
import { IModelName } from '../../../interfaces';

interface IProps {
	modelName: IModelName;
	inputType: InputType;
}

const generateTopInputClassFragment = ({ modelName, inputType }: IProps) => {
	let data = '';

	data += `@InputType()` + Character.LINE_BREAK;
	data += `export class ${inputType}${modelName.singular.pascalCase}Input {`;
	data += Character.LINE_BREAK;

	return data;
};

export default generateTopInputClassFragment;
