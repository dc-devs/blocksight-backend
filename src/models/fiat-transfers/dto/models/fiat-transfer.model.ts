import { Prisma } from '@prisma/client';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsString, IsNumber, IsDate } from 'class-validator';
import { GraphQLJSON } from 'graphql-type-json';
import { Exchange } from '../../../exchanges/dto/models/exchange.model';

@ObjectType()
export class FiatTransfer {
	@IsNumber()
	@Field({ nullable: true })
	id?: number;

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

	@Field(() => Exchange, { nullable: true })
	exchange?: Exchange;

	@IsDate()
	@Field({ nullable: true })
	createdAt?: Date;

	@IsDate()
	@Field({ nullable: true })
	updatedAt?: Date;
}
