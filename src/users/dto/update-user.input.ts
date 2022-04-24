// https://docs.nestjs.com/controllers#request-payloads
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserInput {
	@IsEmail()
	@IsOptional()
	email: string;
}

export default UpdateUserInput;
