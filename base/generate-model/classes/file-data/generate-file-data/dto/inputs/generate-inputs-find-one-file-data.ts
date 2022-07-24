import { Character, InputType } from '../../../enums';
import { IModelName, IModelAttributes } from '../../../../../interfaces';
import {
	generateInputFields,
	generateImportNestJsGraphQl,
	generateBottomClassFragment,
	generateImportClassValidator,
	generateTopInputClassFragment,
} from '../../../utils';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}
interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateInputsFindOneFileData = ({
	modelName,
	modelAttributes,
}: IProps) => {
	let data = '';
	const { classValidators, attributes } = modelAttributes.unique;
	const importClassValidator = generateImportClassValidator({
		classValidators: classValidators,
		addIsOptional: true,
	});
	const importNestJsGraphQl = generateImportNestJsGraphQl();
	const topInputClassFragment = generateTopInputClassFragment({
		modelName,
		inputType: InputType.FIND_ONE,
	});
	const inputFields = generateInputFields({
		attributes,
		setAllFieldsOpional: true,
	});
	const bottomClassFragment = generateBottomClassFragment();

	data += importNestJsGraphQl;
	data += importClassValidator;
	data += Character.LINE_BREAK;

	data += topInputClassFragment;
	data += inputFields;
	data += bottomClassFragment;

	return data;
};

export default generateInputsFindOneFileData;
