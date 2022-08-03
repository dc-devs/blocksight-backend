import { Character, RelationType } from '../../../../../../../../enums';
import { IModelAttributes } from '../../../../../../../../interfaces/model-attribute';

interface IProps {
	modelAttributes: IModelAttributes;
}

const generateQueryAttributes = ({ modelAttributes }: IProps) => {
	let data = '';
	const { all, relatedTo, relationType } = modelAttributes;
	const { attributes } = all;

	data += Character.TAB + Character.TAB + 'id' + Character.LINE_BREAK;

	Object.keys(attributes).forEach((attribute) => {
		data +=
			Character.TAB + Character.TAB + attribute + Character.LINE_BREAK;
	});

	if (relatedTo) {
		Object.keys(relatedTo).forEach((modelName) => {
			const modelAttributes = relatedTo[modelName];
			let modelNameQuery = modelName;

			if (relationType === RelationType.MANY_TO_MANY) {
				modelNameQuery = modelNameQuery.replace(/s$/g, '');
			}

			data +=
				Character.TAB +
				Character.TAB +
				modelNameQuery +
				' {' +
				Character.LINE_BREAK;

			modelAttributes.forEach((attribute) => {
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

//     name
//     websiteUrl
//     logoUrl
//     companyLogoUrl
//     hasApi
//     hasCsv
//     createdAt
//     updatedAt

//     users {
//       id
//       email
//       primaryWalletAddress
//       role
//       createdAt
//       updatedAt
//     }
