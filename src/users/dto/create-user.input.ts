// https://docs.nestjs.com/controllers#request-payloads
import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class CreateUserInput {
	@IsEmail()
	email: string;

	@IsString()
	@MinLength(8)
	password: string;

	@IsString()
	@MinLength(8)
	@IsOptional()
	passwordConfirmation: string;
}
