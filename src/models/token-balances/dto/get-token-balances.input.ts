import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

@InputType()
export class GetTokenBalancesInput {
	@IsString()
	@IsOptional()
	@Field({ nullable: true })
	filter?: string;

	@IsString()
	@IsOptional()
	@Field({ nullable: true })
	address?: string;

	@IsString()
	@IsOptional()
	@Field({ nullable: true })
	currency?: string;
}
