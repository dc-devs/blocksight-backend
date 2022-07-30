import { Field, InputType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class CreateUsersExchangesInput {
	@IsNumber()
	@Field({ nullable: true })
	userId?: number;

	@IsNumber()
	@Field({ nullable: true })
	exchangeId?: number;
}
