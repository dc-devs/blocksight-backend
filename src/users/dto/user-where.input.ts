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
export class UserWhereInput {
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

// @ArgsType()
// export class UserWhereInput extends UserSpecificWhereInput {
// 	@IsOptional()
// @IsOptional()
// @Field({ nullable: true })
// 	AND?: ;

// 	@IsOptional()
// @IsOptional()
// @Field({ nullable: true })
// 	OR?: ;

// 	@IsOptional()
// @IsOptional()
// @Field({ nullable: true })
// 	NOT?: ;
// }

// input UserWhereInput {
// 	AND: [UserWhereInput]
// 	OR: [UserWhereInput]
// 	NOT: [UserWhereInput]
// 	id: Int
// 	email: String
// 	role: String
// 	createdAt: DateTime
// 	updatedAt: DateTime
// }
