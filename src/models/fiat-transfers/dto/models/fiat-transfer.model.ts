import { Exchange } from '../../../exchanges/dto/models/exchange.model';
import { User } from '../../../users/dto/models/user.model';
import { Prisma } from '@prisma/client';
import { GraphQLJSON } from 'graphql-type-json';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsString, IsDate, IsNumber } from 'class-validator';

@ObjectType()
export class FiatTransfer {
	@IsNumber()
	@Field({ nullable: true })
	id?: number;

	@Field(() => Exchange, { nullable: true })
	exchange?: Exchange;

	@Field(() => User, { nullable: true })
	user?: User;

	@IsString()
	@Field({ nullable: true })
	type?: string;

	@IsString()
	@Field({ nullable: true })
	amount?: string;

	@IsString()
	@Field({ nullable: true })
	currency?: string;

	@IsDate()
	@Field({ nullable: true })
	timestamp?: Date;

	@IsString()
	@Field(() => GraphQLJSON, { nullable: true })
	transferData?: Prisma.InputJsonValue;

	@IsNumber()
	@Field({ nullable: true })
	exchangeId?: number;

	@IsNumber()
	@Field({ nullable: true })
	userId?: number;

	@IsDate()
	@Field({ nullable: true })
	createdAt?: Date;

	@IsDate()
	@Field({ nullable: true })
	updatedAt?: Date;
}
