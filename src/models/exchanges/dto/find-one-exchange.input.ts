import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, IsOptional } from 'class-validator';

@InputType()
export class FindOneExchangeInput {
	@IsNumber()
	@IsOptional()
	@Field({ nullable: true })
	id?: number;

	@IsString()
	@IsOptional()
	@Field({ nullable: true })
	name?: string;
}
