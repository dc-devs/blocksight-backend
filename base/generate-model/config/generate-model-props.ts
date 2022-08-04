import { RelationType } from '../enums';
import { IGenerateModelConstructorProps } from '../interfaces/config';
const modelNamePluralPascalCase = 'UsersExchanges';

//
// LONG TERM TODO
// 1. Generate CRUD tests for gen model
// 2. Add relationship tests to users / exchanges
// 3. Add those tests to users_exchanges in gen_model
//
// Short term TODO
// - Refactor create, rename files and put into utils/create
// - Update relatedTo somehow, not sure what's best..


// Not all names should be in plural PascalCase
const config: IGenerateModelConstructorProps = {
	modelNamePluralPascalCase,
	relationType: RelationType.MANY_TO_MANY,
	attributes: {
		userId: {
			// isUnique: true,
			typeScriptType: 'number',
			classValidators: ['IsNumber'],
		},
		exchangeId: {
			// isUnique: true,
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
	relatedTo: {
		Users: [
			'id',
			'role',
			'email',
			'primaryWalletAddress',
			'createdAt',
			'updatedAt',
		],
		Exchanges: [
			'id',
			'name',
			'websiteUrl',
			'logoUrl',
			'companyLogoUrl',
			'hasApi',
			'hasCsv',
			'createdAt',
			'updatedAt',
		],
	},
};

export default config;
