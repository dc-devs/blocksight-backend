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
		assignedAt: {
			typeScriptType: 'Date',
			classValidators: ['IsDate'],
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
