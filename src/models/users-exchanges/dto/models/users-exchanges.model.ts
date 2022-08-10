import { User } from '../../../users/dto/models/user.model';
import { Exchange } from '../../../exchanges/dto/models/exchange.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, IsDate } from 'class-validator';

@ObjectType()
export class UsersExchanges {
	@IsNumber()
	@Field({ nullable: true })
	id?: number;

	@Field(() => User, { nullable: true })
	user?: User;

	@Field(() => Exchange, { nullable: true })
	exchange?: Exchange;

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
