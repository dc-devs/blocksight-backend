import { IModelName } from '../../../../../../../../interfaces/model-name';
import { IModelAttributes } from '../../../../../../../../interfaces/model-attribute';
import { DtoType, InputType, GraphqlModule } from '../../../../../../enums';
import {
	generateInputFields,
	generateBottomClassFragment,
	generateImportsAndTopClassFragment,
} from '../../../../../../utils';

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
	const className = `${InputType.UPDATE}${modelName.singular.pascalCase}${DtoType.INPUT}`;
	const importsAndTopClassFragment = generateImportsAndTopClassFragment({
		className,
		classValidators,
		classValidatorsIsOptional: true,
		graphqlType: GraphqlModule.INPUT_TYPE,
	});

	const inputFields = generateInputFields({
		attributes,
		setAllFieldsOpional: true,
	});
	const bottomClassFragment = generateBottomClassFragment();

	data += importsAndTopClassFragment;
	data += inputFields;
	data += bottomClassFragment;

	return data;
};

export default generateInputsUpdateFileData;
