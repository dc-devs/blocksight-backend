import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsNumber, IsString } from 'class-validator';

@InputType()
export class UsersExchangesCursorInput {
	@IsOptional()
	@IsNumber()
	@Field({ nullable: true })
	id?: number;

	@IsNumber()
	@IsOptional()
	@Field({ nullable: true })
	userId?: number;

	@IsNumber()
	@IsOptional()
	@Field({ nullable: true })
	exchangeId?: number;

	@IsString()
	@IsOptional()
	@Field({ nullable: true })
	apiKey?: string;

	@IsString()
	@IsOptional()
	@Field({ nullable: true })
	apiSecret?: string;

	@IsString()
	@IsOptional()
	@Field({ nullable: true })
	apiPassphrase?: string;

	@IsString()
	@IsOptional()
	@Field({ nullable: true })
	apiNickname?: string;
}
