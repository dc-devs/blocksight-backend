import { UserRole } from '@prisma/client';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, IsEmail, IsDate } from 'class-validator';
import { FiatTransfer } from '../../../fiat-transfers/dto/models/fiat-transfer.model';
import { UsersExchanges } from '../../../users-exchanges/dto/models/users-exchanges.model';

@ObjectType()
export class User {
	@IsNumber()
	@Field({ nullable: true })
	id?: number;

	@IsEmail()
	@Field({ nullable: true })
	email?: string;

	@IsString()
	@Field({ nullable: true })
	primaryWalletAddress?: string;

	@IsString()
	@Field({ nullable: true })
	role?: UserRole;

	@Field(() => [UsersExchanges], { nullable: true })
	exchanges?: UsersExchanges[];

	@Field(() => [FiatTransfer], { nullable: true })
	fiatTransfers?: FiatTransfer[];

	@IsDate()
	@Field({ nullable: true })
	createdAt?: Date;

	@IsDate()
	@Field({ nullable: true })
	updatedAt?: Date;
}
