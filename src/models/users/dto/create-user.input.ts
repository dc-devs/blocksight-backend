import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

@InputType()
export class CreateUserInput {
	@Field()
	@IsEmail()
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
