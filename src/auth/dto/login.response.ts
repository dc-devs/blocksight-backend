import { IsString } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class LoginResponse {
	@Field()
	@IsString()
	access_token: string;

	@Field()
	user: User;
}
