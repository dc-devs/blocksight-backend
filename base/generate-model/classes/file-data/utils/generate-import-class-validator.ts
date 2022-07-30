import { ClassValidator } from '../enums';
import { Character } from '../../../enums';

interface IProps {
	autoImports?: boolean;
	addIsOptional?: boolean;
	classValidators: string[];
}

const generateImportClassValidator = ({
	classValidators,
	autoImports = true,
	addIsOptional = false,
}: IProps) => {
	let classValidatorImport = ``;

	classValidatorImport += 'import { ';

	if (addIsOptional) {
		classValidatorImport += `${ClassValidator.IS_OPIONAL}`;

		if (autoImports) {
			classValidatorImport += ', ';
		}
	}

	if (autoImports) {
		classValidators.forEach((classValidator, index) => {
			const isLastItem = classValidators.length - 1 === index;

			classValidatorImport += `${classValidator}`;

			if (!isLastItem) {
				classValidatorImport += `, `;
			}
		});
	}

	classValidatorImport += ` } from 'class-validator';`;
	classValidatorImport += Character.LINE_BREAK;

	return classValidatorImport;
};

export default generateImportClassValidator;
