import { RelationType } from '../enums';
import { IGenerateModelConstructorProps } from '../interfaces/config';

/** 
 * Manual Updates if JSON Type
 *  service.ts
 
const data = createFiatTransferInput;
const { exchangeId, type, amount, currency, timestamp, transferData } = data;

return this.prisma.fiatTransfer.create({
	data: {
		type,
		amount,
		currency,
		timestamp,
		transferData,
		exchange: { connect: { id: exchangeId } },
	},
	select,
});

*/

// LAST Update tests only start NestJs Once..

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
			specialType: 'JSON',
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
				timestamp: new Date().toISOString(),
				transferData: JSON.stringify({ test: 'value' }),
				exchangeId: 1,
			},
		},
		findAll: {
			where: {
				modelAttribute: 'type',
				modelValue: 'deposit',
				expectedCount: 11,
			},
			whereNot: {
				modelAttribute: 'type',
				modelValue: 'withdraw',
				expectedCount: 11,
			},
			whereOr: {
				modelAttribute: 'type',
				modelValue: 'withdraw',
				expectedCount: 22,
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
