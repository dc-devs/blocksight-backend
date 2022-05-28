import { Prisma } from '@prisma/client';

import { IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserOrderByInput {
	@IsOptional()
	@Field({ nullable: true })
	id?: Prisma.SortOrder;

	@IsOptional()
	@Field({ nullable: true })
	email?: Prisma.SortOrder;

	@IsOptional()
	@Field({ nullable: true })
	role?: Prisma.SortOrder;

	@IsOptional()
	@Field({ nullable: true })
	createdAt?: Prisma.SortOrder;

	@IsOptional()
	@Field({ nullable: true })
	updatedAt?: Prisma.SortOrder;
}
