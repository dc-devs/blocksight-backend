import { Character } from '../../../../../../../../enums';
import { IModelName } from '../../../../../../../../interfaces/model-name';
import { PrismaType, GraphqlModule } from '../../../../../../enums';
import { IModel } from '../../../../../../../../interfaces/model';
import {
	generateBottomClassFragment,
	generateImportsAndTopClassFragment,
} from '../../../../../../utils';

interface IProps {
	modelName: IModelName;
	model: IModel;
}

const generatePrismaWhereFileData = ({ modelName, model }: IProps) => {
	let data = '';
	const { classValidators } = model.attributeBundles.withoutTimeStamps;
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
