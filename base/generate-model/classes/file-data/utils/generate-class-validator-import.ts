interface IProps {
	classValidators: string[];
}

const generateClassValidatorImport = ({ classValidators }: IProps) => {
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

	return classValidatorImport;
};

export default generateClassValidatorImport;
