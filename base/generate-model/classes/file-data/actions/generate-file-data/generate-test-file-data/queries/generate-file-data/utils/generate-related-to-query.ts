import { Character, RelationType } from '../../../../../../../../enums';
import { IModel } from '../../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
}

const generateHasOneQuery = (relationalModelNames, relatedTo, modelName) => {
	let data = '';
	const relatedModel = relatedTo[modelName];

	const modelNameQuery = relationalModelNames[modelName].singular.camelCase;
	data +=
		Character.TAB +
		Character.TAB +
		modelNameQuery +
		' {' +
		Character.LINE_BREAK;

	relatedModel.forEach((attribute) => {
		data +=
			Character.TAB +
			Character.TAB +
			Character.TAB +
			attribute +
			Character.LINE_BREAK;
	});

	return data;
};

const generateRelatedToQuery = ({ model }: IProps) => {
	let data = '';
	const { relatedTo, relationType, relationalModelNames } = model;

	Object.keys(relatedTo).forEach((modelName) => {
		const hasOneQuery = generateHasOneQuery(
			relationalModelNames,
			relatedTo,
			modelName,
		);
		if (
			relationType === RelationType.HAS_ONE ||
			relationType === RelationType.MANY_TO_MANY
		) {
			data += hasOneQuery;
		} else if (relationType === RelationType.HAS_MANY) {
			const relationModelName =
				relationalModelNames[modelName].plural.camelCase;

			data +=
				Character.TAB +
				Character.TAB +
				`${relationModelName} {` +
				Character.LINE_BREAK;
			data += hasOneQuery;
			data += Character.TAB + Character.TAB + `}` + Character.LINE_BREAK;
		}

		data += Character.TAB + Character.TAB + '}' + Character.LINE_BREAK;
	});

	return data;
};

export default generateRelatedToQuery;
