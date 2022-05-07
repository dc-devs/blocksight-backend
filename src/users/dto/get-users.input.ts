// https://docs.nestjs.com/controllers#request-payloads
import { Prisma } from '@prisma/client';
import { Field, ArgsType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

// TODO: BREAKOUT Pagination Args into own class
// https://docs.nestjs.com/graphql/resolvers#class-inheritance
@ArgsType()
export class GetUsersInput {
	@IsNumber()
	@IsOptional()
	@Field()
	skip?: number;

	@IsNumber()
	@IsOptional()
	@Field()
	take?: number;

	@IsOptional()
	@Field()
	cursor?: Prisma.UserWhereUniqueInput;

	@IsOptional()
	@Field()
	where?: Prisma.UserWhereInput;

	@IsOptional()
	@Field()
	orderBy?: Prisma.UserOrderByWithRelationInput;
}
