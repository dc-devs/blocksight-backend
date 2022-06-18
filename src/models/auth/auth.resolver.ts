import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { SignInMetaMaskInput } from './dto/sign-in-metamask.input';
import { SessionInput, SessionResponse, LogOutResponse } from './dto';
import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import { CreateUserEmailInput } from '../users/dto/create-user-email.input';
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
			const { address } = signInMetaMaskInput;

			const user = await this.usersService.createOrGetFromAddress({
				primaryWalletAddress: address,
			});

			const loggedInUser = await this.authService.login({
				...request,
				user: { ...user },
			});

			return { isAuthenticated: true, user: loggedInUser };
		} catch (error) {
			generateGraphQLError(error);
		}
	}

	@Mutation(() => SessionResponse)
	async signUp(
		@Context('req') request,
		@Args('createUserEmailInput')
		createUserEmailInput: CreateUserEmailInput,
	) {
		try {
			const newUser = await this.usersService.create({
				...createUserEmailInput,
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
