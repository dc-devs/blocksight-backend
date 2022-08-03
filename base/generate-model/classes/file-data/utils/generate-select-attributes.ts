import { IRelatedTo } from '../../../interfaces/config';
import { IAttributes } from '../../../interfaces/model-attribute';
import { Attribute, Character, RelationType } from '../../../enums';

interface IProps {
	attributes: IAttributes;
	relationType: RelationType;
	relatedTo: IRelatedTo | undefined;
}

const generateSelectAttributes = ({
	relatedTo,
	attributes,
	relationType,
}: IProps) => {
	let selectAttributes = ``;

	selectAttributes += '{' + Character.LINE_BREAK;
	selectAttributes +=
		Character.TAB + `${Attribute.ID}:true,` + Character.LINE_BREAK;

	if (relationType === RelationType.MANY_TO_MANY) {
		if (relatedTo) {
			Object.keys(relatedTo).forEach((attribute) => {
				const relationalAttribute = attribute
					.toLocaleLowerCase()
					.replace(/s$/g, '');
				selectAttributes +=
					Character.TAB +
					`${relationalAttribute}: true,` +
					Character.LINE_BREAK;
			});
		}
	}

	Object.keys(attributes).forEach((attribute) => {
		selectAttributes +=
			Character.TAB + `${attribute}: true,` + Character.LINE_BREAK;
	});

	selectAttributes += '};';

	return selectAttributes;
};

export default generateSelectAttributes;
