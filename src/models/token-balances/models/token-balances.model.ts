import { Field, ObjectType } from '@nestjs/graphql';
import { TokenBalance } from './token-balance.model';
import { Value } from './value.model';

@ObjectType()
export class TokenBalances {
	@Field(() => Value, { nullable: true })
	totalValue: Value;

	@Field(() => [TokenBalance], { nullable: true })
	balances: TokenBalance[];
}
