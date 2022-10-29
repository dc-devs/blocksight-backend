import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsNumber } from 'class-validator';

@InputType()
export class FindOneFiatTransferInput {
	@IsOptional()
	@IsNumber()
	@Field({ nullable: true })
	id?: number;
}
