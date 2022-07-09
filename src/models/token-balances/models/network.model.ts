import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Network {
	@Field({ nullable: true })
	chainId?: string;

	@Field({ nullable: true })
	chainName?: string;

	@Field({ nullable: true })
	name?: string;

	@Field({ nullable: true })
	rpcUrl?: string;

	@Field({ nullable: true })
	symbol?: string;

	@Field({ nullable: true })
	blockExplorerUrl?: string;

	@Field({ nullable: true })
	logoUrl?: string;
}
