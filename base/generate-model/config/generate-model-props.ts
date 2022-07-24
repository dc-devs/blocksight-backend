import { IGenerateModelConstructorProps } from '../interfaces';

const modelNamePluralPascalCase = 'UsersExchanges';

const config: IGenerateModelConstructorProps = {
	modelNamePluralPascalCase,
	isManyToMany: true,
	attributes: {
		userId: {
			isUnique: true,
			graphqlType: '',
			typeScriptType: 'number',
			classValidators: ['IsNumber'],
		},
		exchangeId: {
			isUnique: true,
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
