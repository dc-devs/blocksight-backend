import { Users } from '../../../userss/dto/models/users.model';
import { Exchanges } from '../../../exchangess/dto/models/exchanges.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsDate } from 'class-validator';

@ObjectType()
export class UsersExchanges {
	@IsNumber()
	@Field({ nullable: true })
	id?: number;

	@Field(() => users, { nullable: true })
	users?: users;

	@Field(() => exchanges, { nullable: true })
	exchanges?: exchanges;

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
