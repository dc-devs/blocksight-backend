import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, IsOptional } from 'class-validator';

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
