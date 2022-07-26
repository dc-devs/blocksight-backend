import { IModelName } from '../../../../../../interfaces/model-name';
import { IModelAttributes } from '../../../../../../interfaces/model-attribute';
import {
	DtoType,
	Character,
	InputType,
	GraphqlModule,
} from '../../../../enums';
import {
	generateInputFields,
	generateTopClassFragment,
	generateImportNestJsGraphQl,
	generateBottomClassFragment,
	generateImportClassValidator,
} from '../../../../utils';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateInputsCreateFileData = ({
	modelName,
	modelAttributes,
}: IProps) => {
	let data = '';
	const { classValidators, attributes } = modelAttributes.withoutTimeStamps;
	const importClassValidator = generateImportClassValidator({
		classValidators: classValidators,
	});
	const importNestJsGraphQl = generateImportNestJsGraphQl({
		modules: [GraphqlModule.INPUT_TYPE],
	});
	const className = `${InputType.CREATE}${modelName.singular.pascalCase}${DtoType.INPUT}`;
	const topInputClassFragment = generateTopClassFragment({
		className,
		decorator: GraphqlModule.INPUT_TYPE,
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

export default generateInputsCreateFileData;
