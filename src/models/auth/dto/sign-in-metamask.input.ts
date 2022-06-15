import { IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignInMetaMaskInput {
	@Field()
	@IsString()
	address: string;

	@Field()
	@IsString()
	signature: string;

	@Field()
	@IsString()
	message: string;
}
