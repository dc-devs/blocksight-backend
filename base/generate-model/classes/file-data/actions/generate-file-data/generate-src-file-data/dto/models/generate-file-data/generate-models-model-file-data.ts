import { paramCase, pascalCase } from 'change-case';
import { GraphqlModule } from '../../../../../../enums';
import { Character, RelationType } from '../../../../../../../../enums';
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

const generateModelsModelFileData = ({ modelName, model }: IProps) => {
	let data = '';
	const { relatedTo, relationType, hasJSONAttribute } = model;
	const { classValidators, attributes } = model.attributeBundles.all;
	const className = `${modelName.singular.pascalCase}`;

	if (
		relationType === RelationType.MANY_TO_MANY ||
		relationType === RelationType.HAS_ONE
	) {
		if (relatedTo) {
			Object.keys(relatedTo).forEach((modelName) => {
				const className = pascalCase(modelName).replace(/s$/g, '');
				const pathName = paramCase(modelName).toLowerCase();
				const pathNameSingular = pathName.replace(/s$/g, '');

				data +=
					`import { ${className} } from '../../../${pathName}/dto/models/${pathNameSingular}.model';` +
					Character.LINE_BREAK;
			});
		}
	}

	const importsAndTopClassFragment = generateImportsAndTopClassFragment({
		className,
		classValidators,
		hasJSONAttribute,
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
