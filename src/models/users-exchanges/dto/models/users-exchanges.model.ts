import { Field, ObjectType, } from '@nestjs/graphql';
import { IsNumber, IsDate } from 'class-validator';

@ObjectType()
export class UsersExchanges {
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
