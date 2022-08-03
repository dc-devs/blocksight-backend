import { RelationType } from '../enums';
import { IGenerateModelConstructorProps } from '../interfaces/config';
const modelNamePluralPascalCase = 'UsersExchanges';

// Left off
// TODO
// 1. Generate CRUD tests for gen model
// 2. Add relationship tests to users / exchanges
// 3. Add those tests to users_exchanges in gen_model
//
// Short term TODO
// - add isUnique to userId and exchangeId
// - Update src/models/users-exchanges/enums/users-exchanges-validation-error.enum.ts
// to add IS_TAKEN error Messages
// - Update create test to loop through isUnique values to generate these tests
// - Refactor create, rename files and put into utils/create

const config: IGenerateModelConstructorProps = {
	modelNamePluralPascalCase,
	relationType: RelationType.MANY_TO_MANY,
	relatedTo: {
		users: [
			'id',
			'role',
			'email',
			'primaryWalletAddress',
			'createdAt',
			'updatedAt',
		],
		exchanges: [
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
};

export default config;
