import { Character } from '../enums';

interface IProps {
	modules: string[];
}

const generateImportNestJsGraphQl = ({ modules }: IProps) => {
	let data = '';

	data += 'import { Field, ';

	modules.forEach((module, index) => {
		const isLastItem = modules.length - 1 === index;

		data += `${module}`;

		if (!isLastItem) {
			data += ',';
		}
	});

	data += ` } from '@nestjs/graphql';`;
	data += Character.LINE_BREAK;

	return data;
};

export default generateImportNestJsGraphQl;
