import { IModelAttributes } from '../../../interfaces';

interface IProps {
	attributes: IModelAttributes;
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
