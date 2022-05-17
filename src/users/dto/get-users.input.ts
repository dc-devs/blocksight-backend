import { Cursor } from './cursor.input';
import { Field, InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { IsNumber, IsOptional } from 'class-validator';
import { UserOrderByInput } from './user-order-by.input';

@InputType()
export class GetUsersInput {
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
	cursor?: Cursor;

	@IsOptional()
	@Field({ nullable: true })
	where?: UserWhereInput;

	@IsOptional()
	@Field({ nullable: true })
	orderBy?: UserOrderByInput;
}
