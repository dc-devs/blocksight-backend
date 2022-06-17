import { IsEmail, IsString, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
	@IsEmail()
	@IsOptional()
	@Field({ nullable: true })
	email?: string;

	@IsString()
	@IsOptional()
	@Field({ nullable: true })
	primaryWalletAddress?: string;
}
