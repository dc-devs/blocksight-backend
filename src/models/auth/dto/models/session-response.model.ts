import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../../users/dto/models/user.model';

@ObjectType()
export class SessionResponse {
	@Field()
	user: User;

	@Field()
	isAuthenticated: boolean;
}
