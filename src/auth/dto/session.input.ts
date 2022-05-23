import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsEmail } from 'class-validator';

@InputType()
export class SessionInput {
	@Field()
	@IsEmail()
	email: string;

	@Field()
	@IsString()
	password: string;
}
