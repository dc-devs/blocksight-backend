import { FiatTransferInput } from './fiat-transfer.input';
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class FiatTransferWhereInput extends FiatTransferInput {
	@IsOptional()
	@Field(() => [FiatTransferInput], { nullable: true })
	AND?: [FiatTransferInput];

	@IsOptional()
	@Field(() => [FiatTransferInput], { nullable: true })
	OR?: [FiatTransferInput];

	@IsOptional()
	@Field(() => [FiatTransferInput], { nullable: true })
	NOT?: [FiatTransferInput];
}
