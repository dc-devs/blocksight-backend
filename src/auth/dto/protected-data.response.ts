import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProtectedData {
	@Field()
	isProtectedData: boolean;
}
