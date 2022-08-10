import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, IsDate } from 'class-validator';

@InputType()
export class UsersExchangesInput {
	@IsNumber()
	@Field({ nullable: true })
	id?: number;

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

	@IsDate()
	@Field({ nullable: true })
	createdAt?: Date;

	@IsDate()
	@Field({ nullable: true })
	updatedAt?: Date;
}
