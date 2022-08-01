import { RelationType } from '../enums';
import { IGenerateModelConstructorProps } from '../interfaces/config';
const modelNamePluralPascalCase = 'UsersExchanges';

// Left off
// - Added many to many to config so this src code is now done
//
// TODO
// 1. Generate CRUD tests for gen model
// 2. Add relationship tests to users / exchanges
// 3. Add those tests to users_exchanges in gen_model
//

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
