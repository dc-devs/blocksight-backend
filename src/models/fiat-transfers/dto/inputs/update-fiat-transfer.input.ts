import { Prisma } from '@prisma/client';
import { GraphQLJSON } from 'graphql-type-json';
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsDate, IsNumber } from 'class-validator';

@InputType()
export class UpdateFiatTransferInput {
	@IsString()
	@IsOptional()
	@Field({ nullable: true })
	type?: string;

	@IsString()
	@IsOptional()
	@Field({ nullable: true })
	amount?: string;

	@IsString()
	@IsOptional()
	@Field({ nullable: true })
	currency?: string;

	@IsDate()
	@IsOptional()
	@Field({ nullable: true })
	timestamp?: Date;

	@IsOptional()
	@Field(() => GraphQLJSON, { nullable: true })
	transferData?: Prisma.InputJsonValue;

	@IsNumber()
	@IsOptional()
	@Field({ nullable: true })
	exchangeId?: number;

	@IsNumber()
	@IsOptional()
	@Field({ nullable: true })
	userId?: number;
}
