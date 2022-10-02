import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Value {
	@Field({ nullable: true })
	value?: string;

	@Field({ nullable: true })
	formatted?: string;
}
