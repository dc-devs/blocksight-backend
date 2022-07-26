import { UsersExchangesService } from './users-exchanges.service';
import { UsersExchanges } from './dto/models/users-exchanges.model';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import generateGraphQLError from '../../graphql/errors/generate-graphql-error';
import {
	UpdateUsersExchangesInput,
	CreateUsersExchangesInput,
	FindOneUsersExchangesInput,
	FindAllUsersExchangesInput,
} from './dto/inputs';

@Resolver(() => UsersExchanges)
export class UsersExchangesResolver {
	constructor(private readonly usersExchangesService: UsersExchangesService) {}

	@Query(() => [UsersExchanges])
	findAllUsersExchanges(
		@Args('findAllUsersExchangesInput')
		findAllUsersExchangesInput: FindAllUsersExchangesInput,
	): Promise<UsersExchanges[]> {
		return this.usersExchangesService.findAll(findAllUsersExchangesInput);
	}

	@Query(() => UsersExchanges, { nullable: true })
	findOneUsersExchanges(
		@Args('findOneUsersExchangesInput')
		findOneUsersExchangesInput: FindOneUsersExchangesInput,
	): Promise<UsersExchanges | null> {
		return this.usersExchangesService.findOne(findOneUsersExchangesInput);
	}

	@Mutation(() => UsersExchanges)
	async createUsersExchanges(
		@Args('createUsersExchangesInput')
		createUsersExchangesInput: CreateUsersExchangesInput,
	) {
		try {
			return await this.usersExchangesService.create({
				...createUsersExchangesInput,
			});
		} catch (error) {
			generateGraphQLError(error);
		}
	}

	@Mutation(() => UsersExchanges)
	async updateUsersExchanges(
		@Args('id', { type: () => Int }) id: number,
		@Args('updateUsersExchangesInput') updateUsersExchangesInput: UpdateUsersExchangesInput,
	): Promise<UsersExchanges> {
		try {
			return await this.usersExchangesService.update(id, updateUsersExchangesInput);
		} catch (error) {
			generateGraphQLError(error);
		}
	}

	@Mutation(() => UsersExchanges)
	deleteUsersExchanges(
		@Args('id', { type: () => Int }) id: number,
	): Promise<UsersExchanges> {
		return this.usersExchangesService.delete(id);
	}
}
