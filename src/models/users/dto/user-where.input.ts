import { UserInput } from './user.input';
import { IsOptional, } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserWhereInput extends UserInput {
	@IsOptional()
	@Field(() => [UserInput], { nullable: true })
	AND?: [UserInput];

	@IsOptional()
	@Field(() => [UserInput], { nullable: true })
	OR?: [UserInput];

	@IsOptional()
	@Field(() => [UserInput], { nullable: true })
	NOT?: [UserInput];
}
