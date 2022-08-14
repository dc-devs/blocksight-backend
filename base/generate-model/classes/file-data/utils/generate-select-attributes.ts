import { IRelatedTo } from '../../../interfaces/config';
import { IAttributes, IRelationalModelNames } from '../../../interfaces/model';
import { Attribute, Character, RelationType } from '../../../enums';

interface IProps {
	attributes: IAttributes;
	relationType: RelationType;
	relatedTo: IRelatedTo | undefined;
	relationalModelNames: IRelationalModelNames;
}

const generateSelectAttributes = ({
	relatedTo,
	attributes,
	relationType,
	relationalModelNames,
}: IProps) => {
	let selectAttributes = ``;

	selectAttributes += '{' + Character.LINE_BREAK;
	selectAttributes +=
		Character.TAB + `${Attribute.ID}:true,` + Character.LINE_BREAK;

	if (
		relationType === RelationType.MANY_TO_MANY ||
		relationType === RelationType.HAS_ONE
	) {
		if (relatedTo) {
			Object.keys(relatedTo).forEach((modelName) => {
				const relationalAttribute =
					relationalModelNames[modelName].singular.camelCase;

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
