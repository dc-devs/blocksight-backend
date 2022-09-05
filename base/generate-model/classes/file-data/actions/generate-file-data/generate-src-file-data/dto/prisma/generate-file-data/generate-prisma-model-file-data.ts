import { PrismaType, GraphqlModule } from '../../../../../../enums';
import { IModelName } from '../../../../../../../../interfaces/model-name';
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

const generatePrismaModelFileData = ({ modelName, model }: IProps) => {
	let data = '';
	const { hasJSONAttribute } = model;
	const customJsonFieldValue = hasJSONAttribute ? 'Prisma.JsonFilter' : undefined;
	const { classValidators, attributes } = model.attributeBundles.all;
	const className = `${modelName.singular.pascalCase}${PrismaType.INPUT}`;
	const importsAndTopClassFragment = generateImportsAndTopClassFragment({
		className,
		classValidators,
		hasJSONAttribute,
		graphqlType: GraphqlModule.INPUT_TYPE,
	});
	const inputFields = generateInputFields({
		attributes,
		customJsonFieldValue,
		id: {
			addClassValidation: true,
		},
	});
	const bottomClassFragment = generateBottomClassFragment();

	data += importsAndTopClassFragment;
	data += inputFields;
	data += bottomClassFragment;

	return data;
};

export default generatePrismaModelFileData;
