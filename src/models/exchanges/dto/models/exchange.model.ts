import { Field, ObjectType } from '@nestjs/graphql';
import { UsersExchanges } from '../../../users-exchanges/dto/models/users-exchanges.model';
import { IsNumber, IsString, IsDate, IsBoolean } from 'class-validator';

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

	@IsBoolean()
	@Field({ nullable: true })
	hasApi?: boolean;

	@IsBoolean()
	@Field({ nullable: true })
	hasCsv?: boolean;

	@Field(() => [UsersExchanges], { nullable: true })
	users?: UsersExchanges[];

	@IsDate()
	@Field({ nullable: true })
	createdAt?: Date;

	@IsDate()
	@Field({ nullable: true })
	updatedAt?: Date;
}
