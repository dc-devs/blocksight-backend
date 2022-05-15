import { User as PrismaUser } from '@prisma/client';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, IsEmail, IsDate } from 'class-validator';

@ObjectType()
export class UserWithPassword {
	@Field()
	@IsNumber()
	id: PrismaUser['id'];

	@Field()
	@IsEmail()
	email: PrismaUser['email'];

	@Field()
	@IsString()
	role: PrismaUser['role'];

	@Field()
	@IsString()
	password: PrismaUser['password'];

	@Field()
	@IsDate()
	createdAt: PrismaUser['createdAt'];

	@Field()
	@IsDate()
	updatedAt: PrismaUser['updatedAt'];
}
