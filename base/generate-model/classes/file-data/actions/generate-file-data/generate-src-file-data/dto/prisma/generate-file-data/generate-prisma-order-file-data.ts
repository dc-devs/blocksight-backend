import { Character } from '../../../../../../../../enums';
import { IModelName } from '../../../../../../../../interfaces/model-name';
import { PrismaType, GraphqlModule } from '../../../../../../enums';
import { IModel } from '../../../../../../../../interfaces/model';
import {
	generateInputFields,
	generateBottomClassFragment,
	generateImportsAndTopClassFragment,
} from '../../../../../../utils';

interface IProps {
	modelName: IModelName;
	model: IModel;
}

const generatePrismaOrderFileData = ({ modelName, model }: IProps) => {
	let data = '';
	const { classValidators, attributes } = model.attributeBundles.all;
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
		id: {
			addIsOptional: true,
			value: PrismaType.PRISMA_SORT_ORDER,
		},
	});
	const bottomClassFragment = generateBottomClassFragment();

	data += importPrisma;
	data += importsAndTopClassFragment;
	data += inputFields;
	data += bottomClassFragment;

	return data;
};

export default generatePrismaOrderFileData;
