import { Exchange } from '../../../exchanges/dto/models/exchange.model';
import { Prisma } from '@prisma/client';
import { GraphQLJSON } from 'graphql-type-json';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsString, IsNumber, IsDate } from 'class-validator';

@ObjectType()
export class FiatTransfer {
	@IsNumber()
	@Field({ nullable: true })
	id?: number;

	@Field(() => Exchange, { nullable: true })
	exchange?: Exchange;

	@IsString()
	@Field({ nullable: true })
	type?: string;

	@IsNumber()
	@Field({ nullable: true })
	amount?: number;

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

	@IsDate()
	@Field({ nullable: true })
	createdAt?: Date;

	@IsDate()
	@Field({ nullable: true })
	updatedAt?: Date;
}
