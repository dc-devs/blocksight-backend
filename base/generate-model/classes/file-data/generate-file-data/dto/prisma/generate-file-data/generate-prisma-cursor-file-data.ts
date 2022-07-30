import { PrismaType, GraphqlModule } from '../../../../enums';
import { IModelName } from '../../../../../../interfaces/model-name';
import { IModelAttributes } from '../../../../../../interfaces/model-attribute';
import {
	generateInputFields,
	generateBottomClassFragment,
	generateImportsAndTopClassFragment,
} from '../../../../utils';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generatePrismaCursorFileData = ({
	modelName,
	modelAttributes,
}: IProps) => {
	let data = '';
	const { classValidators, attributes } = modelAttributes.withoutTimeStamps;
	const className = `${modelName.singular.pascalCase}${PrismaType.CURSOR}`;
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

export default generatePrismaCursorFileData;
