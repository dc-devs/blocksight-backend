import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsNumber, IsString } from 'class-validator';

@InputType()
export class FindOneUsersExchangesInput {
	@IsOptional()
	@IsNumber()
	@Field({ nullable: true })
	id?: number;
}
