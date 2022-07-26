import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';
import {
	UsersExchangesWhereInput,
	UsersExchangesOrderByInput,
	UsersExchangesCursorInput,
} from '../prisma';

@InputType()
export class FindAllUsersExchangesInput {
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
	cursor?: UsersExchangesCursorInput;

	@IsOptional()
	@Field({ nullable: true })
	where?: UsersExchangesWhereInput;

	@IsOptional()
	@Field({ nullable: true })
	orderBy?: UsersExchangesOrderByInput;
}
