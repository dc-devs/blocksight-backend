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

const generateInputsCreateFileData = ({ modelName, model }: IProps) => {
	let data = '';
	const { relatedTo, relationType, hasJSONAttribute } = model;
	const { classValidators, attributes } =
		model.attributeBundles.withoutTimeStamps;
	const className = `${InputType.CREATE}${modelName.singular.pascalCase}${DtoType.INPUT}`;
	const importsAndTopClassFragment = generateImportsAndTopClassFragment({
		className,
		classValidators,
		hasJSONAttribute,
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
