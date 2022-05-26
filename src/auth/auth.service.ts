import { compareSync } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { User } from '../users/models/user.model';
import { SessionInput } from './dto/session.input';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}

	async validateUser({ email, password }: SessionInput) {
		let validatedUser: User | null = null;
		const user = await this.usersService._findOne({ email });

		if (user) {
			const hasCorrectPassword = compareSync(password, user.password);

			if (user && hasCorrectPassword) {
				const { password, ...restOfUserData } = user;
				validatedUser = restOfUserData;
			}
		}

		return validatedUser;
	}

	async login(user: User) {
		// add cookie to session
		return {
			user,
		};
	}
}
