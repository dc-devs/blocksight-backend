import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/models/user.model';
import { SessionInput } from './dto/session.input';
import { LoginResponse } from './dto/login-response.model';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ProtectedData } from './dto/protected-data.response';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import generateGraphQLError from '../graphql/errors/generate-graphql-error';

// LEFT OFF
// watch https://youtu.be/_L225zpUK0M?t=1744 to implement passport and session magic...
// In this case I think we'll be ripping out JWT stuffs in implementing passport session only..
@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Mutation(() => LoginResponse)
	@UseGuards(LocalAuthGuard)
	async login(
		@Args('sessionInput') sessionInput: SessionInput,
		@Context('user') user: User,
	) {
		console.log('');
		console.log('[AuthResolver::login] callling authService.login');
		console.log('');
		return this.authService.login(user);
	}

	@Mutation(() => LoginResponse)
	async signup(@Args('sessionInput') sessionInput: SessionInput) {
		try {
			return this.authService.signUp(sessionInput);
		} catch (error) {
			generateGraphQLError(error);
		}
	}

	@Query(() => ProtectedData)
	@UseGuards(AuthenticatedGuard)
	async protectedRoute() {
		return { isProtectedData: true };
	}
}
