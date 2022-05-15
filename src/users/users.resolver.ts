import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { GetUserInput } from './dto/get-user.input';
import { GetUsersInput } from './dto/get-users.input';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import generateGraphQLError from '../graphql/errors/generate-graphql-error';

@Resolver('User')
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Query('users')
	findAll(@Args() getUsersInput: GetUsersInput) {
		return this.usersService.findAll(getUsersInput);
	}

	@Query('user')
	findOne(@Args('getUserInput') getUserInput: GetUserInput) {
		return this.usersService.findOne(getUserInput);
	}

	@Mutation('createUser')
	async create(@Args('createUserInput') createUserInput: CreateUserInput) {
		try {
			return await this.usersService.create(createUserInput);
		} catch (error) {
			generateGraphQLError(error);
		}
	}

	@Mutation('updateUser')
	async update(
		@Args('id', { type: () => Int }) id: number,
		@Args('updateUserInput') updateUserInput: UpdateUserInput
	) {
		try {
			return await this.usersService.update(id, updateUserInput);
		} catch (error) {
			generateGraphQLError(error);
		}
	}

	@Mutation('deleteUser')
	remove(@Args('id', { type: () => Int }) id: number) {
		return this.usersService.delete(id);
	}
}
