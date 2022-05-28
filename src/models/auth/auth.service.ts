import { compareSync } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { User } from '../users/models/user.model';
import { SessionInput } from './dto/session.input';
import { UsersService } from '../users/users.service';
import { UnauthorizedException } from '@nestjs/common';

interface LoginRequest {
	user?: User;
	session?: any;
}

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}

	async validateUser({ email, password }: SessionInput) {
		try {
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
		} catch (e) {
			throw new UnauthorizedException();
		}
	}

	async login(request: LoginRequest) {
		const { user } = request;

		if (user && request.session) {
			request.session.userId = user.id;
		} else {
			throw new UnauthorizedException();
		}

		return user;
	}
}
