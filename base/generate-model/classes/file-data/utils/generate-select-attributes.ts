import { IModelAttributesInput } from '../../../interfaces/config';

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
