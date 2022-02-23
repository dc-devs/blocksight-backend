// https://docs.nestjs.com/controllers#request-payloads
import { IsString } from 'class-validator';

export class CreateUserInput {
	@IsString()
	email: string;

	@IsString()
	password: string;
}
