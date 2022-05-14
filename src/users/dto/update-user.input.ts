import { IsEmail } from 'class-validator';
import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class UpdateUserInput {
	@Field()
	@IsEmail()
	email: string;
}
