import { RelationType } from '../enums';
import { IGenerateModelConstructorProps } from '../interfaces/config';

const modelNamePluralPascalCase = 'FiatTransfers';

const config: IGenerateModelConstructorProps = {
	modelNamePluralPascalCase,
	attributes: {
		type: {
			typeScriptType: 'string',
			classValidators: ['IsString'],
		},
		amount: {
			typeScriptType: 'number',
			classValidators: ['IsNumber'],
		},
		currency: {
			typeScriptType: 'string',
			classValidators: ['IsString'],
		},
		timestamp: {
			typeScriptType: 'Date',
			classValidators: ['IsDate'],
		},
		transferData: {
			typeScriptType: 'string',
			classValidators: ['IsString'],
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
	relationType: RelationType.HAS_ONE,
	relatedTo: {
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
				type: 'Updated Type',
				amount: 100.01,
				currency: 'Updated Currency',
				timestamp: '2021-06-04 16:09:55.901324+00',
				transferData: JSON.stringify({ test: 'value' }),
				exchangeId: 1,
			},
		},
		findAll: {
			where: {
				modelAttribute: 'type',
				modelValue: 'deposit',
				expectedCount: 5,
			},
			whereNot: {
				modelAttribute: 'type',
				modelValue: 'withdraw',
				expectedCount: 5,
			},
			whereOr: {
				modelAttribute: 'type',
				modelValue: 'withdraw',
				expectedCount: 5,
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
