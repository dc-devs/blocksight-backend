import { UseGuards } from '@nestjs/common';
import { User } from '../users/models/user.model';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { SessionInput, SessionResponse } from './dto';
import { CreateUserInput } from '../users/dto/create-user.input';
import { LogInUser, IsValidUser, IsAuthenticated } from './guards';
import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import generateGraphQLError from '../graphql/errors/generate-graphql-error';

@Resolver()
export class AuthResolver {
	constructor(
		private authService: AuthService,
		private usersService: UsersService,
	) {}

	@Mutation(() => SessionResponse)
	@UseGuards(IsValidUser, LogInUser)
	async login(
		@Context('req') request,
		@Args('sessionInput') sessionInput: SessionInput,
	) {
		const { user } = request;

		return { user };
	}

	@Mutation(() => SessionResponse)
	async signup(
		@Context('req') request,
		@Args('createUserInput') createUserInput: CreateUserInput,
	) {
		try {
			const newUser = await this.usersService.create({ ...createUserInput });
	
			const loggedInUser = await this.authService.login({
				...request,
				user: { ...newUser },
			});
	
			return { user: loggedInUser };
		} catch (error) {
			generateGraphQLError(error);
		}
	}

	@Query(() => User)
	@UseGuards(IsAuthenticated)
	async currentUser(@Context('req') request) {
		const { user } = request;

		return user;
	}
}
