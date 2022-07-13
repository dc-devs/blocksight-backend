import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';
import { UserCursor, UserWhereInput, UserOrderByInput } from '../prisma';

@InputType()
export class FindAllUsersInput {
	@IsNumber()
	@IsOptional()
	@Field({ nullable: true })
	skip?: number;

	@IsNumber()
	@IsOptional()
	@Field({ nullable: true })
	take?: number;

	@IsOptional()
	@Field({ nullable: true })
	cursor?: UserCursor;

	@IsOptional()
	@Field({ nullable: true })
	where?: UserWhereInput;

	@IsOptional()
	@Field({ nullable: true })
	orderBy?: UserOrderByInput;
}
