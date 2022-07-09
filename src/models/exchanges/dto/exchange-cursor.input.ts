import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class ExchangeCursor {
	@IsNumber()
	@IsOptional()
	@Field({ nullable: true })
	id?: number;

	@IsString()
	@IsOptional()
	@Field({ nullable: true })
	name?: string;
}
