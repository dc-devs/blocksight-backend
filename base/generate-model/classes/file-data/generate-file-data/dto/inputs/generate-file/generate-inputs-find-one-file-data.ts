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
	const importNestJsGraphQl = generateImportNestJsGraphQl({
		modules: [GraphqlModule.INPUT_TYPE],
	});
	const className = `${InputType.FIND_ONE}${modelName.singular.pascalCase}${DtoType.INPUT}`;
	const topInputClassFragment = generateTopClassFragment({
		className,
		decorator: GraphqlModule.INPUT_TYPE,
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
