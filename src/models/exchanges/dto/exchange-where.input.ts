import { IsOptional } from 'class-validator';
import { ExchangeInput } from './exchange.input';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ExchangeWhereInput extends ExchangeInput {
	@IsOptional()
	@Field(() => [ExchangeInput], { nullable: true })
	AND?: [ExchangeInput];

	@IsOptional()
	@Field(() => [ExchangeInput], { nullable: true })
	OR?: [ExchangeInput];

	@IsOptional()
	@Field(() => [ExchangeInput], { nullable: true })
	NOT?: [ExchangeInput];
}
