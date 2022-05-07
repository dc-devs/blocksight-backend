// https://docs.nestjs.com/controllers#request-payloads
import { Prisma } from '@prisma/client';
import { Field, ArgsType } from '@nestjs/graphql';
import { IsString, IsEmail } from 'class-validator';

@ArgsType()
export class UpdateUserInput {
	@IsEmail()
	@Field()
	email: string;

	// @IsString()
	// @Field()
	// role: Prisma.EnumUserRoleFieldUpdateOperationsInput;

	// @IsString()
	// @Field()
	// password: string;
}
