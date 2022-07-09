import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';
import { IsNumber, IsString, IsDate } from 'class-validator';

@ObjectType()
export class Exchange {
	@IsNumber()
	@Field({ nullable: true })
	id?: number;

	@IsString()
	@Field({ nullable: true })
	name?: string;

	@IsString()
	@Field({ nullable: true })
	websiteUrl?: string;

	@IsString()
	@Field({ nullable: true })
	logoUrl?: string;

	@IsString()
	@Field({ nullable: true })
	companyLogoUrl?: string;

	// TODO: ALso Update same on Users
	// @IsOptional()
	// @Field(() => [UserInput], { nullable: true })
	// OR?: [UserInput];
	@Field(() => [User], { nullable: true })
	users?: [User];

	@IsDate()
	@Field({ nullable: true })
	createdAt?: Date;

	@IsDate()
	@Field({ nullable: true })
	updatedAt?: Date;
}
