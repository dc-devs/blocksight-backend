import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsDate } from 'class-validator';

@InputType()
export class UsersExchangesInput {
	@IsNumber()
	@Field({ nullable: true })
	id?: number;

	@IsNumber()
	@Field({ nullable: true })
	userId?: number;

	@IsNumber()
	@Field({ nullable: true })
	exchangeId?: number;

	@IsDate()
	@Field({ nullable: true })
	createdAt?: Date;

	@IsDate()
	@Field({ nullable: true })
	updatedAt?: Date;
};
