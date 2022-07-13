import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsBoolean } from 'class-validator';

@InputType()
export class CreateExchangeInput {
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
}
