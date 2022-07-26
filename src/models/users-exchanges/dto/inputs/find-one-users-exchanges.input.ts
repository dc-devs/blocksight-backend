import { Field, InputType, } from '@nestjs/graphql';
import { IsOptional, IsNumber } from 'class-validator';

@InputType()
export class FindOneUsersExchangesInput {
	@IsNumber()
	@IsOptional()
	@Field({ nullable: true })
	userId?: number;

	@IsNumber()
	@IsOptional()
	@Field({ nullable: true })
	exchangeId?: number;
};
