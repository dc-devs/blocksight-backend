import { Prisma } from '@prisma/client';
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class FiatTransferOrderByInput {
	@IsOptional()
	@Field({ nullable: true })
	id?: Prisma.SortOrder;

	@IsOptional()
	@Field({ nullable: true })
	type?: Prisma.SortOrder;

	@IsOptional()
	@Field({ nullable: true })
	amount?: Prisma.SortOrder;

	@IsOptional()
	@Field({ nullable: true })
	currency?: Prisma.SortOrder;

	@IsOptional()
	@Field({ nullable: true })
	timestamp?: Prisma.SortOrder;

	@IsOptional()
	@Field({ nullable: true })
	transferData?: Prisma.SortOrder;

	@IsOptional()
	@Field({ nullable: true })
	exchangeId?: Prisma.SortOrder;

	@IsOptional()
	@Field({ nullable: true })
	createdAt?: Prisma.SortOrder;

	@IsOptional()
	@Field({ nullable: true })
	updatedAt?: Prisma.SortOrder;
}
