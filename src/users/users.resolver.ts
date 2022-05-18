import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { FindOneUserInput } from './dto/find-one-user.input';
import { FindAllUsersInput } from './dto/find-all-users.input';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import generateGraphQLError from '../graphql/errors/generate-graphql-error';

@Resolver(() => User)
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Query(() => [User])
	findAllUsers(
		@Args('findAllUsersInput') findAllUsersInput: FindAllUsersInput,
	): Promise<User[]> {
		return this.usersService.findAll(findAllUsersInput);
	}

	@Query(() => User, { nullable: true })
	findOneUser(
		@Args('findOneUserInput') findOneUserInput: FindOneUserInput,
	): Promise<User | null> {
		return this.usersService.findOne(findOneUserInput);
	}

	@Mutation(() => User)
	async createUser(
		@Args('createUserInput') createUserInput: CreateUserInput,
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
		@Args('updateUserInput') updateUserInput: UpdateUserInput,
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
