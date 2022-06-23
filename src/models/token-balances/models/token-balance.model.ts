import { UserRole, User as PrismaUser } from '@prisma/client';
import { Field, ObjectType, Int } from '@nestjs/graphql';
import { IsNumber, IsString, IsEmail, IsDate } from 'class-validator';
import { Value } from './value.model';

@ObjectType()
export class TokenBalance {
	@IsString()
	@Field({ nullable: true })
	name?: string;

	@IsString()
	@Field({ nullable: true })
	symbol?: string;

	@IsString()
	@Field({ nullable: true })
	logoUrl?: string;

	@IsString()
	@Field({ nullable: true })
	contractAddress?: string;

	@IsString()
	@Field({ nullable: true })
	balance?: string;

	@Field(() => Value, { nullable: true })
	totalValue: Value;

	@Field(() => Value, { nullable: true })
	price: Value;
}
