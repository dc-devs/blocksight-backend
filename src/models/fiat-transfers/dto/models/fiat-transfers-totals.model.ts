import { IsNumber } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';
import { Value } from '../../../../common/dto/value';

@ObjectType()
export class FiatTransfersTotals {
	@IsNumber()
	@Field(() => Value)
	totalDeposited: Value;

	@IsNumber()
	@Field(() => Value)
	totalWorking: Value;

	@IsNumber()
	@Field(() => Value)
	totalWithdrawn: Value;
}
