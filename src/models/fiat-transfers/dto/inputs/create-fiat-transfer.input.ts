import { Prisma } from '@prisma/client';
import { GraphQLJSON } from 'graphql-type-json';
import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNumber, IsDate } from 'class-validator';

@InputType()
export class CreateFiatTransferInput {
	@IsString()
	@Field({ nullable: true })
	type?: string;

	@IsNumber()
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
}
