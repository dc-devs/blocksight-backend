// https://docs.nestjs.com/controllers#request-payloads
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserInput {
	@IsEmail()
	email: string;

	@IsString()
	@MinLength(8)
	password: string;
}
