import { IsString } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';

@ObjectType()
export class LoginResponse {
	@Field()
	@IsString()
	access_token: string;

	@Field()
	user: User;
}
