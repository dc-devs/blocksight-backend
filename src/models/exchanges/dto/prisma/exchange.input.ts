import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNumber, IsString, IsBoolean } from 'class-validator';

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
	
	@IsBoolean()
	@Field({ nullable: true })
	hasApi?: boolean;
	
	@IsBoolean()
	@Field({ nullable: true })
	hasCsv?: boolean;

	@IsDate()
	@Field({ nullable: true })
	createdAt?: Date;

	@IsDate()
	@Field({ nullable: true })
	updatedAt?: Date;
}
