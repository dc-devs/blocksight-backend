// https://docs.nestjs.com/controllers#request-payloads
import { Field, ArgsType } from '@nestjs/graphql';
import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

@ArgsType()
export class CreateUserInput {
	@IsEmail()
	@Field()
	email: string;

	@IsString()
	@MinLength(8)
	@Field()
	password: string;

	@IsString()
	@MinLength(8)
	@IsOptional()
	@Field()
	passwordConfirmation: string;
}
