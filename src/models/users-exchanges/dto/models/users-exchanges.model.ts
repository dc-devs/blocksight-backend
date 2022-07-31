import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsDate } from 'class-validator';
import { User } from '../../../users/dto/models/user.model';
import { Exchange } from '../../../exchanges/dto/models/exchange.model';

@ObjectType()
export class UsersExchanges {
	@IsNumber()
	@Field({ nullable: true })
	id?: number;

	@IsNumber()
	@Field({ nullable: true })
	userId?: number;

	@IsNumber()
	@Field({ nullable: true })
	exchangeId?: number;

	@Field(() => Exchange, { nullable: true })
	exchange?: Exchange;

	@Field(() => User, { nullable: true })
	user?: User;

	@IsDate()
	@Field({ nullable: true })
	createdAt?: Date;

	@IsDate()
	@Field({ nullable: true })
	updatedAt?: Date;
}
