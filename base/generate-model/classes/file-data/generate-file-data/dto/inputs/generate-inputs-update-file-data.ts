import { Character, InputType } from '../../../enums';
import { IModelName } from '../../../../../interfaces/model-name';
import {  IModelAttributes } from '../../../../../interfaces/model-attribute';
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

const generateInputsUpdateFileData = ({
	modelName,
	modelAttributes,
}: IProps) => {
	let data = '';
	const { classValidators, attributes } = modelAttributes.withoutTimeStamps;
	const importClassValidator = generateImportClassValidator({
		addIsOptional: true,
		classValidators: classValidators,
	});
	const importNestJsGraphQl = generateImportNestJsGraphQl();
	const topInputClassFragment = generateTopInputClassFragment({
		modelName,
		inputType: InputType.UPDATE,
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

export default generateInputsUpdateFileData;
