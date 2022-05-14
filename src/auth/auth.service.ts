import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	// Add DTO
	// Use Bcrypt to encode password
	async validateUser(email: string, suppliedPassword: string): Promise<any> {
		let validatedUser = null;
		const user = await this.usersService._findOne({ email });
		const hasCorrectPassword = compareSync(suppliedPassword, user.password);

		if (user && hasCorrectPassword) {
			const { password, ...restOfUserData } = user;
			validatedUser = restOfUserData;
		}

		return validatedUser;
	}

	async login(user: any) {
		const payload = { email: user.email, sub: user.id };
		console.log('');
		console.log('[AuthService]::login, payload]', payload);
		console.log('');

		const access_token = this.jwtService.sign(payload);

		console.log('');
		console.log('[AuthService]::access_token]', access_token);
		console.log('');

		return {
			access_token,
		};
	}
}
