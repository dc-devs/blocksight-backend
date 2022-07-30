import { PrismaType, GraphqlModule, Character } from '../../../../enums';
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

const generatePrismaWhereFileData = ({
	modelName,
	modelAttributes,
}: IProps) => {
	let data = '';
	const { classValidators } = modelAttributes.withoutTimeStamps;
	const importModelInput =
		`import { ${modelName.singular.pascalCase}${PrismaType.INPUT} } from './${modelName.singular.paramCase}.input';` +
		Character.LINE_BREAK;
	const className = `${modelName.singular.pascalCase}${PrismaType.WHERE}${PrismaType.INPUT} extends ${modelName.singular.pascalCase}${PrismaType.INPUT}`;
	const importsAndTopClassFragment = generateImportsAndTopClassFragment({
		className,
		classValidators,
		classValidatorsIsOptional: true,
		classValidatorsAutoImports: false,
		graphqlType: GraphqlModule.INPUT_TYPE,
	});

	const inputFields =
		Character.TAB +
		`@IsOptional()
	@Field(() => [${modelName.singular.pascalCase}Input], { nullable: true })
	AND?: [${modelName.singular.pascalCase}Input];

	@IsOptional()
	@Field(() => [${modelName.singular.pascalCase}Input], { nullable: true })
	OR?: [${modelName.singular.pascalCase}Input];

	@IsOptional()
	@Field(() => [${modelName.singular.pascalCase}Input], { nullable: true })
	NOT?: [${modelName.singular.pascalCase}Input];` +
		Character.LINE_BREAK;

	const bottomClassFragment = generateBottomClassFragment();

	data += importModelInput;
	data += importsAndTopClassFragment;
	data += inputFields;
	data += bottomClassFragment;

	return data;
};

export default generatePrismaWhereFileData;
