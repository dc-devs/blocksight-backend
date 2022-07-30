import { Attribute, Character } from '../../../enums';
import { IAttributes } from '../../../interfaces/model-attribute';

interface IProps {
	attributes: IAttributes;
}

const generateSelectAttributes = ({ attributes }: IProps) => {
	let selectAttributes = ``;

	selectAttributes += '{' + Character.LINE_BREAK;
	selectAttributes +=
		Character.TAB + `${Attribute.ID}:true,` + Character.LINE_BREAK;

	Object.keys(attributes).forEach((attribute) => {
		selectAttributes +=
			Character.TAB + `${attribute}: true,` + Character.LINE_BREAK;
	});

	selectAttributes += '};';

	return selectAttributes;
};

export default generateSelectAttributes;
