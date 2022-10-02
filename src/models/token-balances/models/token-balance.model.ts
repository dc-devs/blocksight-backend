import { IsString } from 'class-validator';
import { Value } from '../../../common/dto/value';
import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType()
export class TokenBalance {
	@IsString()
	@Field({ nullable: true })
	type?: string;

	@IsString()
	@Field({ nullable: true })
	name?: string;

	@Field(() => Value, { nullable: true })
	price: Value;

	@IsString()
	@Field({ nullable: true })
	symbol?: string;

	@IsString()
	@Field({ nullable: true })
	isNft?: boolean;

	@IsString()
	@Field({ nullable: true })
	chainId?: string;

	@IsString()
	@Field({ nullable: true })
	balance?: string;

	@IsString()
	@Field({ nullable: true })
	logoUrl?: string;

	@IsString()
	@Field({ nullable: true })
	decimals?: string;

	@Field(() => Value, { nullable: true })
	totalValue: Value;

	@Field(() => [String], { nullable: true })
	supportsErc?: String[];

	@IsString()
	@Field({ nullable: true })
	contractAddress?: string;
}
