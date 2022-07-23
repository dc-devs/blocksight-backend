import { IModelName } from '../../../interfaces';
import { paramCase, camelCase } from 'change-case';
import getSingularNameFromString from './get-singular-name-from-string';

interface IProps {
	isManyToMany: boolean;
	modelNamePluralPascalCase: string;
}

const generateModelName = ({
	isManyToMany,
	modelNamePluralPascalCase,
}: IProps): IModelName => {
	const modelNameSingularPascalCase = getSingularNameFromString({
		pluralName: modelNamePluralPascalCase,
	});

	const modelNameSingularParamCase = paramCase(modelNameSingularPascalCase);
	const modelNamePluralParamCase = paramCase(modelNamePluralPascalCase);

	const modelNameSingularCamelCase = camelCase(modelNameSingularPascalCase);
	const modelNamePluralCamelCase = camelCase(modelNamePluralPascalCase);

	return {
		singular: {
			pascalCase: isManyToMany
				? modelNamePluralPascalCase
				: modelNameSingularPascalCase,
			paramCase: isManyToMany
				? modelNamePluralParamCase
				: modelNameSingularParamCase,
			camelCase: isManyToMany
				? modelNamePluralCamelCase
				: modelNameSingularCamelCase,
		},
		plural: {
			pascalCase: modelNamePluralPascalCase,
			paramCase: modelNamePluralParamCase,
			camelCase: modelNamePluralCamelCase,
		},
	};
};

export default generateModelName;
