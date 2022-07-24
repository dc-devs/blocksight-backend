const generateClassValidatorDecorators = (classValidators: string[]) => {
	let classValidatorDecorators = ``;

	classValidators.forEach((classValidator) => {
		classValidatorDecorators += `\t@${classValidator}()` + '\n';
	});

	return classValidatorDecorators;
};

export default generateClassValidatorDecorators;
