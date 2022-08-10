import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateUsersExchangesInput {
	@IsNumber()
	@Field({ nullable: true })
	userId?: number;

	@IsNumber()
	@Field({ nullable: true })
	exchangeId?: number;

	@IsString()
	@Field({ nullable: true })
	apiKey?: string;

	@IsString()
	@Field({ nullable: true })
	apiSecret?: string;

	@IsString()
	@Field({ nullable: true })
	apiPassphrase?: string;

	@IsString()
	@Field({ nullable: true })
	apiNickname?: string;
}
