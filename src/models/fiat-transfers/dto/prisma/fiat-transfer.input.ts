import { Prisma } from '@prisma/client';
import { GraphQLJSON } from 'graphql-type-json';
import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsDate, IsNumber } from 'class-validator';

@InputType()
export class FiatTransferInput {
	@IsNumber()
	@Field({ nullable: true })
	id?: number;

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
	transferData?: Prisma.JsonFilter;

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
