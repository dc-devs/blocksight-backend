import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserInput } from '../users/dto/create-user.input';
import { SignInMetaMaskInput } from './dto/sign-in-metamask.input';
import { SessionInput, SessionResponse, LogOutResponse } from './dto';
import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import generateGraphQLError from '../../graphql/errors/generate-graphql-error';
import {
	LogInUser,
	IsValidUser,
	IsAuthenticated,
	IsSignedDataMetaMask,
} from './guards';

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
	@UseGuards(IsSignedDataMetaMask)
	async signInMetaMask(
		@Context('req') request,
		@Args('signInMetaMaskInput') signInMetaMaskInput: SignInMetaMaskInput,
	) {
		try {
			const user = {
				id: 1,
				email: 'email',
				role: 'USER',
			};

			return { isAuthenticated: true, user };

			// const newUser = await this.usersService.create({
			// 	...createUserInput,
			// });
			// const loggedInUser = await this.authService.login({
			// 	...request,
			// 	user: { ...newUser },
			// });
			// return { isAuthenticated: true, user: loggedInUser };
		} catch (error) {
			console.error('ERROR', error);
			// generateGraphQLError(error);
		}
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

	@Mutation(() => LogOutResponse)
	logOut(
		@Context('res') response,
		@Context('req') request,
		@Args('userId') userId: number,
	) {
		try {
			this.authService.logOut({ request, response, userId });

			return { isAuthenticated: false, userId };
		} catch (error) {
			generateGraphQLError(error);
		}
	}
}
