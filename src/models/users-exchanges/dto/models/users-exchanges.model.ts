import { User } from '../../../users/dto/models/user.model';
import { Exchange } from '../../../exchanges/dto/models/exchange.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsDate } from 'class-validator';

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

	@IsDate()
	@Field({ nullable: true })
	createdAt?: Date;

	@IsDate()
	@Field({ nullable: true })
	updatedAt?: Date;
}
