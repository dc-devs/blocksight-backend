import { Character, ClassValidator } from '../enums';

interface IProps {
	addIsOptional?: boolean;
	classValidators: string[];
}

const generateImportClassValidator = ({
	classValidators,
	addIsOptional = false,
}: IProps) => {
	let classValidatorImport = ``;

	classValidatorImport += 'import { ';

	if (addIsOptional) {
		classValidatorImport += `${ClassValidator.IS_OPIONAL}, `;
	}

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
