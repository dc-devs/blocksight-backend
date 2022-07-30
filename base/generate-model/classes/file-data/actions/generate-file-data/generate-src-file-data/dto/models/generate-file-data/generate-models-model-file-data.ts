import { GraphqlModule } from '../../../../../../enums';
import { IModelName } from '../../../../../../../../interfaces/model-name';
import { IModelAttributes } from '../../../../../../../../interfaces/model-attribute';
import {
	generateInputFields,
	generateBottomClassFragment,
	generateImportsAndTopClassFragment,
} from '../../../../../../utils';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateModelsModelFileData = ({
	modelName,
	modelAttributes,
}: IProps) => {
	let data = '';
	const { classValidators, attributes } = modelAttributes.all;
	const className = `${modelName.singular.pascalCase}`;
	const importsAndTopClassFragment = generateImportsAndTopClassFragment({
		className,
		classValidators,
		graphqlType: GraphqlModule.OBJECT_TYPE,
	});
	const inputFields = generateInputFields({
		attributes,
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

export default generateModelsModelFileData;
