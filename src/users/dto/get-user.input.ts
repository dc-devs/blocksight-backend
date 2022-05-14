import { Field, ArgsType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsEmail } from 'class-validator';

@ArgsType()
export class GetUserInput {
	@Field()
	@IsEmail()
	@IsOptional()
	email?: string;

	@Field()
	@IsNumber()
	@IsOptional()
	id?: number;
}
