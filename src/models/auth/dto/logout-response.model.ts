import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LogOutResponse {
	@Field()
	userId: number;

	@Field()
	isAuthenticated: boolean;
}
