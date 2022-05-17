import { IsEmail, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
	@IsEmail()
	@IsOptional()
	@Field({ nullable: true })
	email?: string;
}
