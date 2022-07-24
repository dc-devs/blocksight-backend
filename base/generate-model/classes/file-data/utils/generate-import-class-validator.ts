import { Character } from '../enums';

interface IProps {
	classValidators: string[];
}

const generateImportClassValidator = ({ classValidators }: IProps) => {
	let classValidatorImport = ``;

	classValidatorImport += 'import { ';

	classValidators.forEach((classValidator, index) => {
		const isLastItem = classValidators.length - 1 === index;

		classValidatorImport += `${classValidator}`;

		if (!isLastItem) {
			classValidatorImport += `, `;
		}
	});

	classValidatorImport += ` } from 'class-validator';`;
	classValidatorImport += Character.LINE_BREAK;

	return classValidatorImport;
};

export default generateImportClassValidator;
