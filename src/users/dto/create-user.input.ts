import { Field, ArgsType } from '@nestjs/graphql';
import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

@ArgsType()
export class CreateUserInput {
	@Field()
	@IsEmail()
	email: string;

	@Field()
	@IsString()
	@MinLength(8)
	password: string;

	@Field()
	@IsString()
	@IsOptional()
	@MinLength(8)
	passwordConfirmation?: string;
}
