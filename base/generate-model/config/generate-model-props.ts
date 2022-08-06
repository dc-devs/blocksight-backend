import { RelationType } from '../enums';
import { IGenerateModelConstructorProps } from '../interfaces/config';
const modelNamePluralPascalCase = 'UsersExchanges';

//
// LONG TERM TODO
// 1. Generate CRUD tests for gen model
// 2. Add relationship tests to users / exchanges
// 3. Add those tests to users_exchanges in gen_model

// LEFT OFF
// Started findAll Where test..
// Need to add those attributes to where config , or should you just let those tests fail and update later?
// The only test you'll need to update?

// Note: all names should be in plural PascalCase
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
	tests: {
		update: {
			customValues: {
				userId: 3,
				exchangeId: 3,
			},
		},
		findAll: {
			where: {
				modelAttribute: 'userId',
				modelValue: 1,
				expectedCount: 4,
			},
		},
	},
};

export default config;
