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

const generateInputsUpdateFileData = ({ modelName, model }: IProps) => {
	let data = '';
	const { classValidators, attributes } =
		model.attributeBundles.withoutTimeStamps;
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
