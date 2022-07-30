import { IGenerateModelConstructorProps } from '../interfaces/config';

const modelNamePluralPascalCase = 'UsersExchanges';

const config: IGenerateModelConstructorProps = {
	modelNamePluralPascalCase,
	isManyToMany: true,
	attributes: {
		userId: {
			typeScriptType: 'number',
			classValidators: ['IsNumber'],
		},
		exchangeId: {
			typeScriptType: 'number',
			classValidators: ['IsNumber'],
		},
		createdAt: {
			typeScriptType: 'Date',
			classValidators: ['IsDate'],
		},
		updatedAt: {
			typeScriptType: 'Date',
			classValidators: ['IsDate'],
		},
	},
};

export default config;
