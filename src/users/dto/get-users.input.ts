// https://docs.nestjs.com/controllers#request-payloads
import { IsString, IsEmail, IsNumber, IsOptional } from 'class-validator';
import { Prisma } from '@prisma/client';

export class GetUsersInput {
	@IsNumber()
	@IsOptional()
	id?: number;

	@IsEmail()
	@IsOptional()
	email?: string;

	@IsNumber()
	@IsOptional()
	skip?: number;

	@IsNumber()
	@IsOptional()
	take?: number;

	@IsString()
	@IsOptional()
	cursor?: Prisma.UserWhereUniqueInput;

	@IsString()
	@IsOptional()
	where?: string;

	@IsString()
	@IsOptional()
	orderBy?: Prisma.UserOrderByWithRelationInput;
}

export default GetUsersInput;
