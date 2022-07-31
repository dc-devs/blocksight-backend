import { Attribute, Character, RelationType } from '../../../enums';
import { IAttributes } from '../../../interfaces/model-attribute';

interface IProps {
	attributes: IAttributes;
	relationType: RelationType;
	relatedTo: string[] | undefined;
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
		relatedTo.forEach((attribute) => {
			selectAttributes +=
				Character.TAB +
				`${attribute.toLocaleLowerCase()}: true,` +
				Character.LINE_BREAK;
		});
	}

	Object.keys(attributes).forEach((attribute) => {
		selectAttributes +=
			Character.TAB + `${attribute}: true,` + Character.LINE_BREAK;
	});

	selectAttributes += '};';

	return selectAttributes;
};

export default generateSelectAttributes;
