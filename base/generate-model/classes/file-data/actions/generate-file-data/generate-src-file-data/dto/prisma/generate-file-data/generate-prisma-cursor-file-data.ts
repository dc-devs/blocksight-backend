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

const generatePrismaCursorFileData = ({ modelName, model }: IProps) => {
	let data = '';
	const { classValidators, attributes } =
		model.attributeBundles.withoutTimeStamps;
	const className = `${modelName.singular.pascalCase}${PrismaType.CURSOR}${PrismaType.INPUT}`;
	const importsAndTopClassFragment = generateImportsAndTopClassFragment({
		className,
		classValidators,
		classValidatorsIsOptional: true,
		graphqlType: GraphqlModule.INPUT_TYPE,
	});
	const inputFields = generateInputFields({
		attributes,
		setAllFieldsOpional: true,
		id: {
			addIsOptional: true,
			addClassValidation: true,
		},
	});
	const bottomClassFragment = generateBottomClassFragment();

	data += importsAndTopClassFragment;
	data += inputFields;
	data += bottomClassFragment;

	return data;
};

export default generatePrismaCursorFileData;
