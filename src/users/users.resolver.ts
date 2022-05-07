import { User } from '@prisma/client';
import { UsersService } from './users.service';
import { GetUsersInput } from './dto/get-users.input';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

@Resolver('User')
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Query('users')
	findAll(@Args() args: GetUsersInput): Promise<Partial<User>[]> {
		return this.usersService.findAll(args);
	}

	@Query('user')
	findOne(
		@Args('id', { type: () => Int })
		id: number
	) {
		return this.usersService.findOne(id);
	}

	@Mutation('createUser')
	create(@Args('createUserInput') createUserInput: CreateUserInput) {
		return this.usersService.create(createUserInput);
	}

	@Mutation('updateUser')
	update(
		@Args('id', { type: () => Int }) id: number,
		@Args('updateUserInput') updateUserInput: UpdateUserInput
	) {
		return this.usersService.update(id, updateUserInput);
	}

	@Mutation('deleteUser')
	remove(@Args('id', { type: () => Int }) id: number) {
		return this.usersService.delete(id);
	}
}
