import { IModelAttributesInput } from '../../../interfaces';

interface IProps {
	attributes: IModelAttributesInput;
}

const generateSelectAttributes = ({ attributes }: IProps) => {
	let selectAttributes = ``;

	selectAttributes += '{\n';

	Object.keys(attributes).forEach((attribute) => {
		selectAttributes += `\t${attribute}: true,\n`;
	});

	selectAttributes += '};';

	return selectAttributes;
};

export default generateSelectAttributes;
