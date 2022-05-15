import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInInput } from './dto/login.input';
import { LoginResponse } from './dto/login.response';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CurrentUser } from '../graphql/decorators/current-user.decorator';

@Resolver('Auth')
export class AuthResolver {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService
	) {}

	@Mutation(async () => LoginResponse)
	@UseGuards(GqlAuthGuard)
	logIn(
		@Args('logInInput') logInInput: LogInInput
	): Promise<{ user: User; access_token: string }> {
		const { email, password } = logInInput;
		const isValidated = this.authService.validateUser(email, password);

		const response = this.authService.login(logInInput);

		return response;
	}

	// @Query('signOut')
	// @UseGuards(GqlAuthGuard)
	// signOut(@CurrentUser() user: Partial<User>): Promise<Partial<User>> {
	// 	return this.usersService.findOne({ id: user.id });
	// }

	// @Query('currentUser')
	// @UseGuards(GqlAuthGuard)
	// currentUser(@CurrentUser() user: Partial<User>): Promise<Partial<User>> {
	// 	return this.usersService.findOne({ id: user.id });
	// }
}
