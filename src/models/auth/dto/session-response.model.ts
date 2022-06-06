import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';

@ObjectType()
export class SessionResponse {
	@Field()
	user: User;

	@Field()
	isAuthenticated?: boolean;
}
