import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsNumber } from 'class-validator';

@InputType()
export class UsersExchangesCursorInput {
	@IsOptional()
	@IsNumber()
	@Field({ nullable: true })
	id?: number;

	@IsNumber()
	@IsOptional()
	@Field({ nullable: true })
	userId?: number;

	@IsNumber()
	@IsOptional()
	@Field({ nullable: true })
	exchangeId?: number;
};
