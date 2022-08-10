import { RelationType } from '../enums';
import { IGenerateModelConstructorProps } from '../interfaces/config';
const modelNamePluralPascalCase = 'UsersExchanges';

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
		apiKey: {
			typeScriptType: 'string',
			classValidators: ['IsString'],
		},
		apiSecret: {
			typeScriptType: 'string',
			classValidators: ['IsString'],
		},
		apiPassphrase: {
			typeScriptType: 'string',
			classValidators: ['IsString'],
		},
		apiNickname: {
			typeScriptType: 'string',
			classValidators: ['IsString'],
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
			whereNot: {
				modelValue: 3,
				expectedCount: 3,
				modelAttribute: 'exchangeId',
			},
			whereOr: {
				modelValue: 4,
				expectedCount: 4,
				modelAttribute: 'exchangeId',
			},
			pagination: {
				skip: 1,
				take: 2,
				cursor: JSON.stringify({ id: 1 }),
			},
		},
	},
};

export default config;
