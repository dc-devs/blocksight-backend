import { Prisma } from '@prisma/client';
import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNumber, IsDate } from 'class-validator';

@InputType()
export class CreateFiatTransferInput {
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
	@Field(() => JSON, { nullable: true })
	transferData?: Prisma.JsonValue;

	@IsNumber()
	@Field({ nullable: true })
	exchangeId?: number;
}
