import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

@InputType()
export class CreateUserEmailInput {
	@Field()
	@IsEmail()
	@IsOptional()
	email: string;

	@Field()
	@IsString()
	@MinLength(8)
	password: string;

	@IsString()
	@MinLength(8)
	@IsOptional()
	@Field({ nullable: true })
	passwordConfirmation?: string;
}
