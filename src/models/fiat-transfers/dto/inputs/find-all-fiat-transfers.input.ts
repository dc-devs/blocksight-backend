import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';
import {
	FiatTransferWhereInput,
	FiatTransferOrderByInput,
	FiatTransferCursorInput,
} from '../prisma';

@InputType()
export class FindAllFiatTransfersInput {
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
	cursor?: FiatTransferCursorInput;

	@IsOptional()
	@Field({ nullable: true })
	where?: FiatTransferWhereInput;

	@IsOptional()
	@Field({ nullable: true })
	orderBy?: FiatTransferOrderByInput;
}
