import { UserRole } from '@prisma/client'; // TODO: REMOVE
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async validateUser(email: string, suppliedPassword: string) {
		let validatedUser: User | null = null;
		const user = await this.usersService._findOne({ email });
		const hasCorrectPassword = compareSync(suppliedPassword, user.password);

		if (user && hasCorrectPassword) {
			const { password, ...restOfUserData } = user;
			validatedUser = restOfUserData;
		}

		return validatedUser;
	}

	async login(user: User) {
		const access_token = this.jwtService.sign({ data: user });

		return {
			user,
			access_token,
		};
	}
}
