import { IModelName } from '../../../../../../interfaces/model-name';
import { PrismaType, GraphqlModule, Character } from '../../../../enums';
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

const generatePrismaOrderFileData = ({
	modelName,
	modelAttributes,
}: IProps) => {
	let data = '';
	const { classValidators, attributes } = modelAttributes.all;
	const importPrisma =
		`import { Prisma } from '@prisma/client';` + Character.LINE_BREAK;
	const className = `${modelName.singular.pascalCase}${PrismaType.ORDER_BY}${PrismaType.INPUT}`;
	const importsAndTopClassFragment = generateImportsAndTopClassFragment({
		className,
		classValidators,
		classValidatorsIsOptional: true,
		classValidatorsAutoImports: false,
		graphqlType: GraphqlModule.INPUT_TYPE,
	});
	const inputFields = generateInputFields({
		attributes,
		autoAddValidation: false,
		setAllFieldsOpional: true,
		setAllValues: PrismaType.PRISMA_SORT_ORDER,
	});
	const bottomClassFragment = generateBottomClassFragment();

	data += importPrisma;
	data += importsAndTopClassFragment;
	data += inputFields;
	data += bottomClassFragment;

	return data;
};

export default generatePrismaOrderFileData;
