import { Attribute, Character } from '../../../enums';
import { IAttributes } from '../../../interfaces/model-attribute';

interface IProps {
	attributes: IAttributes;
}

const generateUniqueAttributesObject = ({ attributes }: IProps) => {
	let uniqueAttributesObject = ``;

	uniqueAttributesObject += `{`;
	uniqueAttributesObject += ` ${Attribute.ID}`;

	Object.keys(attributes).forEach((attribute) => {
		uniqueAttributesObject += `, ${attribute}`;
	});

	uniqueAttributesObject += ' }';

	return uniqueAttributesObject;
};

export default generateUniqueAttributesObject;
