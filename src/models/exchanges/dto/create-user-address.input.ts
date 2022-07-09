import { IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserAddressInput {
	@Field()
	@IsString()
	primaryWalletAddress: string;
}
