import { AuthService } from './auth.service';
import { User } from '../users/models/user.model';
import { SessionInput } from './dto/session.input';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SessionResponse } from './dto/session-response.model';
import { ProtectedData } from './dto/protected-data.response';
import { UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import generateGraphQLError from '../graphql/errors/generate-graphql-error';
import { UsersService } from '../users/users.service';
import { SessionConstants } from '../auth/constants/session.constants';

@Resolver()
export class AuthResolver {
	constructor(
		private usersService: UsersService,
		private readonly authService: AuthService,
	) {}

	@Mutation(() => SessionResponse)
	async login(
		@Args('sessionInput') sessionInput: SessionInput,
		@Context('req') request,
		@Context() ctx,
	) {
		const user = await this.authService.validateUser(sessionInput);

		if (!user) {
			throw new UnauthorizedException();
		}

		console.log('');
		console.log('--- Request ---');
		console.log(request);
		console.log('');

		if (request.session) {
			request.session.userId = user.id;
		}

		return this.authService.login(user);
	}

	@Mutation(() => SessionResponse)
	async signup(@Args('sessionInput') sessionInput: SessionInput) {
		try {
			const newUser = await this.usersService.create({ ...sessionInput });
			return await this.authService.login(newUser);
		} catch (error) {
			generateGraphQLError(error);
		}
	}

	@Query(() => User)
	// @UseGuards(AuthenticatedGuard)
	async protectedRoute(@Context('req') request) {
		// Not sure still on how this works, since its only a single session in memory on the server..
		// These two lines can basically be the middleware to get the user from the session and return to front end..
		const id = request.session.userId;
		return await this.usersService.findOne({ id });
	}
}
