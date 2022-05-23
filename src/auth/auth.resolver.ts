import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/models/user.model';
import { SessionInput } from './dto/session.input';
import { LoginResponse } from './dto/login-response.model';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ProtectedData } from './dto/protected-data.response'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import generateGraphQLError from '../graphql/errors/generate-graphql-error';

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
	@UseGuards(JwtAuthGuard)
	async protectedRoute() {
		return { isProtectedData: true };
	}
}
