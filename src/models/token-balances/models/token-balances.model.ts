import { Value } from './value.model';
import { Network } from './network.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { TokenValueBalances } from './token-value-balances.model';

@ObjectType()
export class TokenBalances {
	@Field(() => Value, { nullable: true })
	totalValue: Value;

	@Field(() => [Network], { nullable: true })
	networks: [Network];

	@Field(() => TokenValueBalances, { nullable: true })
	tokens: TokenValueBalances;

	@Field(() => TokenValueBalances, { nullable: true })
	nfts: TokenValueBalances;

	@Field(() => TokenValueBalances, { nullable: true })
	hidden: TokenValueBalances;

	@Field(() => TokenValueBalances, { nullable: true })
	scam: TokenValueBalances;
}
