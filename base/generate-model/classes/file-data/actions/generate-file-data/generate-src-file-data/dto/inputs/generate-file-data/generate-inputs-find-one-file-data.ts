import { IModelName } from '../../../../../../../../interfaces/model-name';
import { IModel } from '../../../../../../../../interfaces/model';
import { DtoType, InputType, GraphqlModule } from '../../../../../../enums';
import {
	generateInputFields,
	generateBottomClassFragment,
	generateImportsAndTopClassFragment,
} from '../../../../../../utils';

interface IProps {
	modelName: IModelName;
	model: IModel;
}
interface IProps {
	modelName: IModelName;
	model: IModel;
}

const generateInputsFindOneFileData = ({ modelName, model }: IProps) => {
	let data = '';
	const { classValidators, attributes } = model.attributeBundles.unique;
	const className = `${InputType.FIND_ONE}${modelName.singular.pascalCase}${DtoType.INPUT}`;
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

export default generateInputsFindOneFileData;
