import { Value } from '../../../common/dto/value';
import { Field, ObjectType } from '@nestjs/graphql';
import { TokenBalance } from './token-balance.model';

@ObjectType()
export class TokenValueBalances {
	@Field(() => Value, { nullable: true })
	totalValue: Value;

	@Field(() => [TokenBalance], { nullable: true })
	balances: TokenBalance[];
}
