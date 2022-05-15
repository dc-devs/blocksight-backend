import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class LoginResponse {
	@Field()
	@IsString()
	access_token: string;

	@Field(() => User)
	user: User;
}
