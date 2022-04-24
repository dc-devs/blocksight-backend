// https://docs.nestjs.com/controllers#request-payloads
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserInput {
	@IsEmail()
	@IsOptional()
	email: string;

	@IsString()
	@IsOptional()
	password: string;

	@IsString()
	@IsOptional()
	role: string;
}

export default UpdateUserInput;
