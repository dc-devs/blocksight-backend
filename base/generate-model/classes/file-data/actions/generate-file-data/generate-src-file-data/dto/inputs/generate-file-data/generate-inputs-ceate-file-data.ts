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

const generateInputsCreateFileData = ({
	modelName,
	modelAttributes,
}: IProps) => {
	let data = '';
	const { relatedTo, relationType } = modelAttributes;
	const { classValidators, attributes } = modelAttributes.withoutTimeStamps;
	const className = `${InputType.CREATE}${modelName.singular.pascalCase}${DtoType.INPUT}`;
	const importsAndTopClassFragment = generateImportsAndTopClassFragment({
		className,
		classValidators,
		graphqlType: GraphqlModule.INPUT_TYPE,
	});
	const inputFields = generateInputFields({
		relatedTo,
		attributes,
		relationType,
	});
	const bottomClassFragment = generateBottomClassFragment();

	data += importsAndTopClassFragment;
	data += inputFields;
	data += bottomClassFragment;

	return data;
};

export default generateInputsCreateFileData;
