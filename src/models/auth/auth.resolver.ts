import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserInput } from '../users/dto/user.input';
import { UsersService } from '../users/users.service';
import { SessionInput, SessionResponse } from './dto';
import { CreateUserInput } from '../users/dto/create-user.input';
import { LogInUser, IsValidUser, IsAuthenticated } from './guards';
import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import generateGraphQLError from '../../graphql/errors/generate-graphql-error';

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

		return { isAuthenticated: true, user };
	}

	@Mutation(() => SessionResponse)
	async signUp(
		@Context('req') request,
		@Args('createUserInput') createUserInput: CreateUserInput,
	) {
		try {
			const newUser = await this.usersService.create({
				...createUserInput,
			});

			const loggedInUser = await this.authService.login({
				...request,
				user: { ...newUser },
			});

			return { isAuthenticated: true, user: loggedInUser };
		} catch (error) {
			generateGraphQLError(error);
		}
	}

	@Query(() => SessionResponse)
	@UseGuards(IsAuthenticated)
	async currentUser(@Context('req') request) {
		const { user } = request;

		return { isAuthenticated: true, user };
	}

	@Mutation(() => SessionResponse)
	logOut(
		@Context('res') response,
		@Context('req') request,
		@Args('user') user: UserInput,
	) {
		try {
			console.log('Response', response);

			// const response = {
			// 	cookie: true,
			// };

			// https://stackoverflow.com/questions/64064611/express-session-cookie-connect-sid-not-being-deleted-from-browser-after-destro
			this.authService.logOut({ request, response, user });

			return { isAuthenticated: false, user };
		} catch (error) {
			generateGraphQLError(error);
		}
	}
}
