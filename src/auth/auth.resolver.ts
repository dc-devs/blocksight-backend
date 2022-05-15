import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInInput } from './dto/login.input';
import { LoginResponse } from './dto/login.response';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { CurrentUser } from '../graphql/decorators/current-user.decorator';

@Resolver('Auth')
export class AuthResolver {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService
	) {}

	@Mutation('login')
	@UseGuards(GqlAuthGuard)
	async login(@Context('user') user: User) {
		return this.authService.login(user);
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
