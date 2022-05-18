import { Prisma } from '@prisma/client';
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
class UserInput {
	@IsNumber()
	@IsOptional()
	@IsOptional()
	@Field({ nullable: true })
	id?: number;

	@IsEmail()
	@IsOptional()
	@IsOptional()
	@Field({ nullable: true })
	email?: string;

	@IsString()
	@IsOptional()
	@IsOptional()
	@Field({ nullable: true })
	role?: UserRole;

	@IsDate()
	@IsOptional()
	@IsOptional()
	@Field({ nullable: true })
	createdAt?: Date;

	@IsDate()
	@IsOptional()
	@IsOptional()
	@Field({ nullable: true })
	updatedAt?: Date;
}

@InputType()
export class UserWhereInput extends UserInput {
	@IsOptional()
	@Field(() => [UserInput], { nullable: true })
	AND?: [UserInput];

	@IsOptional()
	@Field(() => [UserInput], { nullable: true })
	OR?: [UserInput];

	@IsOptional()
	@Field(() => [UserInput], { nullable: true })
	NOT?: [UserInput];
}
