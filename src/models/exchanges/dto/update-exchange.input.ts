import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

@InputType()
export class UpdateExchangeInput {
	@IsString()
	@IsOptional()
	@Field({ nullable: true })
	name?: string;

	@IsString()
	@IsOptional()
	@Field({ nullable: true })
	websiteUrl?: string;

	@IsString()
	@IsOptional()
	@Field({ nullable: true })
	logoUrl?: string;

	@IsString()
	@IsOptional()
	@Field({ nullable: true })
	companyLogoUrl?: string;
}
