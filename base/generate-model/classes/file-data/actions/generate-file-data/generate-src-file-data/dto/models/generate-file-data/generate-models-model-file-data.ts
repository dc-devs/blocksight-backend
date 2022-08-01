import { paramCase, pascalCase } from 'change-case';
import { GraphqlModule } from '../../../../../../enums';
import { Character, RelationType } from '../../../../../../../../enums';
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
	const { relatedTo, relationType } = modelAttributes;
	const { classValidators, attributes } = modelAttributes.all;
	const className = `${modelName.singular.pascalCase}`;

	if (relationType === RelationType.MANY_TO_MANY) {
		if (relatedTo) {
			Object.keys(relatedTo).forEach((modelName) => {
				const modelNamePascal = pascalCase(modelName);
				const modelNameParam = paramCase(modelName).toLowerCase();

				data +=
					`import { ${modelNamePascal} } from '../../../${modelNameParam}s/dto/models/${modelNameParam}.model';` +
					Character.LINE_BREAK;
			});
		}
	}

	const importsAndTopClassFragment = generateImportsAndTopClassFragment({
		className,
		classValidators,
		graphqlType: GraphqlModule.OBJECT_TYPE,
	});
	const inputFields = generateInputFields({
		relatedTo,
		attributes,
		relationType,
		addRelationalFields: true,
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
