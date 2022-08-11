import { Prisma } from '@prisma/client';
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsNumber, IsDate } from 'class-validator';

@InputType()
export class UpdateFiatTransferInput {
	@IsString()
	@IsOptional()
	@Field({ nullable: true })
	type?: string;

	@IsNumber()
	@IsOptional()
	@Field({ nullable: true })
	amount?: number;

	@IsString()
	@IsOptional()
	@Field({ nullable: true })
	currency?: string;

	@IsDate()
	@IsOptional()
	@Field({ nullable: true })
	timestamp?: Date;

	@IsString()
	@IsOptional()
	@Field(() => JSON, { nullable: true })
	transferData?: Prisma.JsonValue;

	@IsNumber()
	@IsOptional()
	@Field({ nullable: true })
	exchangeId?: number;
}
