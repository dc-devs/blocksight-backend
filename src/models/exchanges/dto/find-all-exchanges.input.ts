import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';
import { ExchangeCursor } from './exchange-cursor.input';
import { ExchangeWhereInput } from './exchange-where.input';
import { ExchangeOrderByInput } from './exchange-order-by.input';

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
	cursor?: ExchangeCursor;

	@IsOptional()
	@Field({ nullable: true })
	where?: ExchangeWhereInput;

	@IsOptional()
	@Field({ nullable: true })
	orderBy?: ExchangeOrderByInput;
}
