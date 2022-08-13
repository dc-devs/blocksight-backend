import { RelationType } from '../enums';
import { IGenerateModelConstructorProps } from '../interfaces/config';

// TODO:
// Add specialType: JSON
// Update DTOs
// CreateFiatTransferInput
// UpdateFiatTransferInput
// FiatTransfer
// FiatTransferCursorInput
// import { GraphQLJSON } from 'graphql-type-json';
// @Field(() => GraphQLJSON, { nullable: true })
// transferData?: Prisma.InputJsonValue;
//
// FiatTransfer Also Add
// +import { Exchange } from '../../../exchanges/dto/models/exchange.model';
//  @Field(() => Exchange, { nullable: true })
// +       exchange?: Exchange;
//
// FiatTransferInput
// @Field(() => GraphQLJSON, { nullable: true })
// transferData?: Prisma.JsonFilter;
//
// Service.ts
// select:
// exchange: true,
//
//
// Expect Objects
// All Date types should timestamp: expect.any(String),
//
//
//  const findAllQuery = `
// Need to add 's' to all of the inputs
//
//query Query($findAllFiatTransfersInput: FindAllFiatTransfersInput!) {
// +       findAllFiatTransfers(findAllFiatTransfersInput: $findAllFiatTransfersInput) {
//
// Create/Updae Test values:
// Date new Date().toISOString(),
// JSON = transferData: JSON.stringify({ test: 'value' }),

// runFindAllTests were called update??
//- findAllFiatTransfersInput <-- Some were called added singular

// 

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
