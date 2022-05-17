import { User } from './models/user.model';
import { UsersService } from './users.service';
import { GetUserInput } from './dto/get-user.input';
import { GetUsersInput } from './dto/get-users.input';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Resolver, Context, Query, Mutation, Args, Int } from '@nestjs/graphql';
import generateGraphQLError from '../graphql/errors/generate-graphql-error';

@Resolver(() => User)
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	// LEFT OFF, Getting passing tests for this Resolver
	// Todo:
	// 1. Finish implementing the WHERE, AND, OR in DTO and write simple tests for
	//
	// 2. Update GetUsersInput to FindAllUsersInput
	//    ensure these match the Resolver Name
	//
	// 3. Update named object that comes back in request, @Query arg
	@Query(() => [User])
	findAllUsers(
		@Args('getUsersInput') getUsersInput: GetUsersInput
	): Promise<User[]> {
		return this.usersService.findAll(getUsersInput);
	}

	@Query(() => User, { nullable: true })
	findOneUser(
		@Args('getUserInput') getUserInput: GetUserInput
	): Promise<User | null> {
		return this.usersService.findOne(getUserInput);
	}

	@Mutation(() => User)
	async createUser(
		@Args('createUserInput') createUserInput: CreateUserInput
	): Promise<User> {
		try {
			return await this.usersService.create(createUserInput);
		} catch (error) {
			generateGraphQLError(error);
		}
	}

	@Mutation(() => User)
	async updateUser(
		@Args('id', { type: () => Int }) id: number,
		@Args('updateUserInput') updateUserInput: UpdateUserInput
	): Promise<User> {
		try {
			return await this.usersService.update(id, updateUserInput);
		} catch (error) {
			generateGraphQLError(error);
		}
	}

	@Mutation(() => User)
	deleteUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
		return this.usersService.delete(id);
	}
}
