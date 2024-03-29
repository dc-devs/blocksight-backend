import { Prisma } from '@prisma/client';
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class UsersExchangesOrderByInput {
	@IsOptional()
	@Field({ nullable: true })
	id?: Prisma.SortOrder;

	@IsOptional()
	@Field({ nullable: true })
	userId?: Prisma.SortOrder;

	@IsOptional()
	@Field({ nullable: true })
	exchangeId?: Prisma.SortOrder;

	@IsOptional()
	@Field({ nullable: true })
	apiKey?: Prisma.SortOrder;

	@IsOptional()
	@Field({ nullable: true })
	apiSecret?: Prisma.SortOrder;

	@IsOptional()
	@Field({ nullable: true })
	apiPassphrase?: Prisma.SortOrder;

	@IsOptional()
	@Field({ nullable: true })
	apiNickname?: Prisma.SortOrder;

	@IsOptional()
	@Field({ nullable: true })
	createdAt?: Prisma.SortOrder;

	@IsOptional()
	@Field({ nullable: true })
	updatedAt?: Prisma.SortOrder;
}
