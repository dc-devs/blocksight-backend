import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, IsOptional, IsEmail } from 'class-validator';

@InputType()
export class FindOneUserInput {
	@IsEmail()
	@IsOptional()
	@Field({ nullable: true })
	email?: string;

	@IsString()
	@IsOptional()
	@Field({ nullable: true })
	primaryWalletAddress?: string;

	@IsNumber()
	@IsOptional()
	@Field({ nullable: true })
	id?: number;
}
