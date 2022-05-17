import { UserRole, User as PrismaUser } from '@prisma/client';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, IsEmail, IsDate } from 'class-validator';

@ObjectType()
export class UserWithPassword {
	@Field()
	@IsNumber()
	id: number;

	@Field()
	@IsEmail()
	email: string;

	@Field()
	@IsString()
	role: UserRole;

	@Field()
	@IsString()
	password: string;

	@Field()
	@IsDate()
	createdAt: Date;

	@Field()
	@IsDate()
	updatedAt: Date;
}
