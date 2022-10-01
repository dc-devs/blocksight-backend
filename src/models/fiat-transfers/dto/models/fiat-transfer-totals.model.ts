import { IsNumber } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FiatTransferTotals {
	@IsNumber()
	@Field()
	totalDeposited: string;

	@IsNumber()
	@Field()
	totalWorking: string;

	@IsNumber()
	@Field()
	totalWithdrawn: string;
}
