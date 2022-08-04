import { Character, RelationType } from '../../../../../../../../enums';
import { IModel } from '../../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
}

const generateQueryAttributes = ({ model }: IProps) => {
	let data = '';
	const { attributeBundles, relatedTo, relationType, relationalModelNames } =
		model;
	const { all } = attributeBundles;
	const { attributes } = all;

	data += Character.TAB + Character.TAB + 'id' + Character.LINE_BREAK;

	Object.keys(attributes).forEach((attribute) => {
		data +=
			Character.TAB + Character.TAB + attribute + Character.LINE_BREAK;
	});

	if (relatedTo) {
		Object.keys(relatedTo).forEach((modelName) => {
			let modelNameQuery;
			const model = relatedTo[modelName];

			if (relationType === RelationType.MANY_TO_MANY) {
				modelNameQuery =
					relationalModelNames[modelName].singular.camelCase;
			} else {
				modelNameQuery =
					relationalModelNames[modelName].plural.camelCase;
			}

			data +=
				Character.TAB +
				Character.TAB +
				modelNameQuery +
				' {' +
				Character.LINE_BREAK;

			model.forEach((attribute) => {
				data +=
					Character.TAB +
					Character.TAB +
					Character.TAB +
					attribute +
					Character.LINE_BREAK;
			});

			data += Character.TAB + Character.TAB + '}' + Character.LINE_BREAK;
		});
	}

	return data;
};

export default generateQueryAttributes;
