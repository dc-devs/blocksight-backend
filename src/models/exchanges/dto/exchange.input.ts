import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNumber, IsString } from 'class-validator';

@InputType()
export class ExchangeInput {
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

	@IsDate()
	@Field({ nullable: true })
	createdAt?: Date;

	@IsDate()
	@Field({ nullable: true })
	updatedAt?: Date;
}
