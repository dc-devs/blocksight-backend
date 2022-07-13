import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';
import { ExchangeWhereInput, ExchangeOrderByInput } from '../prisma';
import { ExchangeCursorInput } from '../prisma/exchange-cursor.input';

@InputType()
export class FindAllExchangesInput {
	@IsNumber()
	@IsOptional()
	@Field({ nullable: true })
	skip?: number;

	@IsNumber()
	@IsOptional()
	@Field({ nullable: true })
	take?: number;

	@IsOptional()
	@Field({ nullable: true })
	cursor?: ExchangeCursorInput;

	@IsOptional()
	@Field({ nullable: true })
	where?: ExchangeWhereInput;

	@IsOptional()
	@Field({ nullable: true })
	orderBy?: ExchangeOrderByInput;
}
