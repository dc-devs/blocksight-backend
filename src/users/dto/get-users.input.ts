// https://docs.nestjs.com/controllers#request-payloads
import { Prisma } from '@prisma/client';
import { Field, ArgsType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

// TODO: BREAKOUT Pagination Args into own class
// https://docs.nestjs.com/graphql/resolvers#class-inheritance
@ArgsType()
export class GetUsersInput {
	@Field()
	@IsNumber()
	@IsOptional()
	skip?: number;

	@Field()
	@IsNumber()
	@IsOptional()
	take?: number;

	@Field()
	@IsOptional()
	cursor?: Prisma.UserWhereUniqueInput;

	@Field()
	@IsOptional()
	where?: Prisma.UserWhereInput;

	@Field()
	@IsOptional()
	orderBy?: Prisma.UserOrderByWithRelationInput;
}
