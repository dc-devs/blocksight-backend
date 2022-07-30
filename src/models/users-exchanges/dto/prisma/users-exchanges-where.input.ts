import { UsersExchangesInput } from './users-exchanges.input';
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class UsersExchangesWhereInput extends UsersExchangesInput {
	@IsOptional()
	@Field(() => [UsersExchangesInput], { nullable: true })
	AND?: [UsersExchangesInput];

	@IsOptional()
	@Field(() => [UsersExchangesInput], { nullable: true })
	OR?: [UsersExchangesInput];

	@IsOptional()
	@Field(() => [UsersExchangesInput], { nullable: true })
	NOT?: [UsersExchangesInput];
};
