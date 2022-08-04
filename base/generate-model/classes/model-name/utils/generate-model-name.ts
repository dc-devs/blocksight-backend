import { RelationType } from '../../../enums';
import { paramCase, camelCase } from 'change-case';
import { IModelName } from '../../../interfaces/model-name';
import getSingularNameFromString from './get-singular-name-from-string';

interface IProps {
	relationType?: RelationType;
	modelNamePluralPascalCase: string;
}

const generateModelName = ({
	relationType,
	modelNamePluralPascalCase,
}: IProps): IModelName => {
	let isManyToMany = false;

	if (relationType) {
		isManyToMany = relationType === RelationType.MANY_TO_MANY;
	}

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
