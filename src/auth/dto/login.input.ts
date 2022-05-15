import { Field, ArgsType } from '@nestjs/graphql';
import { IsString, IsEmail } from 'class-validator';

@ArgsType()
export class LogInInput {
	@Field()
	@IsEmail()
	email: string;

	@Field()
	@IsString()
	password: string;
}
