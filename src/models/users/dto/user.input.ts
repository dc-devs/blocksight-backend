import { UserRole } from '@prisma/client';
import { Field, InputType } from '@nestjs/graphql';
import {
	IsDate,
	IsNumber,
	IsEmail,
	IsString,
	IsOptional,
} from 'class-validator';

@InputType()
export class UserInput {
	@IsNumber()
	@IsOptional()
	@Field({ nullable: true })
	id?: number;

	@IsEmail()
	@IsOptional()
	@Field({ nullable: true })
	email?: string;

	@IsString()
	@IsOptional()
	@Field({ nullable: true })
	role?: UserRole;

	@IsDate()
	@IsOptional()
	@Field({ nullable: true })
	createdAt?: Date;

	@IsDate()
	@IsOptional()
	@Field({ nullable: true })
	updatedAt?: Date;
}
