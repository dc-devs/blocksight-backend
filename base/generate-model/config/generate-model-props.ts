import { IGenerateModelConstructorProps } from '../interfaces';

const modelNamePluralPascalCase = 'UsersExchanges';

const config: IGenerateModelConstructorProps = {
	modelNamePluralPascalCase,
	isManyToMany: true,
	attributes: {
		userId: {
			graphqlType: '',
			typeScriptType: 'number',
			classValidators: ['IsNumber'],
		},
		exchangeId: {
			graphqlType: '',
			typeScriptType: 'number',
			classValidators: ['IsNumber'],
		},
		createdAt: {
			graphqlType: '',
			typeScriptType: 'Date',
			classValidators: ['IsDate'],
		},
		updatedAt: {
			graphqlType: '',
			typeScriptType: 'Date',
			classValidators: ['IsDate'],
		},
	},
};

export default config;
