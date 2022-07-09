import { Prisma } from '@prisma/client';
import { IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ExchangeOrderByInput {
	@IsOptional()
	@Field({ nullable: true })
	id?: Prisma.SortOrder;

	@IsOptional()
	@Field({ nullable: true })
	name?: Prisma.SortOrder;

	@IsOptional()
	@Field({ nullable: true })
	websiteUrl?: Prisma.SortOrder;

	@IsOptional()
	@Field({ nullable: true })
	logoUrl?: Prisma.SortOrder;

	@IsOptional()
	@Field({ nullable: true })
	companyLogoUrl?: Prisma.SortOrder;
	
	@IsOptional()
	@Field({ nullable: true })
	hasApi?: Prisma.SortOrder;
	
	@IsOptional()
	@Field({ nullable: true })
	hasCsv?: Prisma.SortOrder;

	@IsOptional()
	@Field({ nullable: true })
	createdAt?: Prisma.SortOrder;

	@IsOptional()
	@Field({ nullable: true })
	updatedAt?: Prisma.SortOrder;
}
