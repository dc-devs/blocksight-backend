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

const generateInputsUpdateFileData = ({
	modelName,
	modelAttributes,
}: IProps) => {
	let data = '';
	const { classValidators, attributes } = modelAttributes.withoutTimeStamps;
	const importClassValidator = generateImportClassValidator({
		classValidators: classValidators,
	});
	const importNestJsGraphQl = generateImportNestJsGraphQl();
	const topInputClassFragment = generateTopInputClassFragment({
		modelName,
		inputType: InputType.UPDATE,
	});
	const inputFields = generateInputFields({ attributes });
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
