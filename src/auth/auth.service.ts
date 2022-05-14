import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}

	// Add DTO
	// Use Bcrypt to encode password
	async validateUser(email: string, suppliedPassword: string): Promise<any> {
		console.log('');
		console.log('[AuthService]::validateUser', email, suppliedPassword);
		console.log('');
		const user = await this.usersService._findOne({ email });
		console.log('[AuthService]::findOne', user);
		console.log('');

		console.log(
			'[AuthService]::password match?',
			user && user.password === suppliedPassword
		);
		console.log('');
		if (user && user.password === suppliedPassword) {
			const { password, ...result } = user;

			console.log(
				'[AuthService]::return User',
				result
			);
			console.log('');
			return result;
		}

		return null;
	}
}
