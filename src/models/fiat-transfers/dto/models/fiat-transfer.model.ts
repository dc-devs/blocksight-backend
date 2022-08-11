import { Prisma } from '@prisma/client';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsString, IsNumber, IsDate } from 'class-validator';

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
	@Field(() => JSON, { nullable: true })
	transferData?: Prisma.JsonValue;

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
