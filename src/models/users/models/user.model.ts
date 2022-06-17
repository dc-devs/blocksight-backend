import { UserRole, User as PrismaUser } from '@prisma/client';
import { Field, ObjectType, Int } from '@nestjs/graphql';
import { IsNumber, IsString, IsEmail, IsDate } from 'class-validator';

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

	@IsDate()
	@Field({ nullable: true })
	createdAt?: Date;

	@IsDate()
	@Field({ nullable: true })
	updatedAt?: Date;
}
