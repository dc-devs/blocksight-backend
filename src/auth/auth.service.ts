import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { User } from '../users/models/user.model';
import { SessionInput } from './dto/session.input';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async validateUser(email: string, suppliedPassword: string) {
		let validatedUser: User | null = null;
		const user = await this.usersService._findOne({ email });
		console.log('[AuthService:validateUser] Validated email / password...');
		const hasCorrectPassword = compareSync(suppliedPassword, user.password);

		if (user && hasCorrectPassword) {
			const { password, ...restOfUserData } = user;
			validatedUser = restOfUserData;
		}
		console.log('');
		console.log('[AuthService:validateUser] Validated email / password...');
		console.log(validatedUser);
		console.log('');

		return validatedUser;
	}

	async login(user: User) {
		const access_token = this.jwtService.sign({ data: user });

		console.log('');
		console.log('[AuthService::login] generate JWT, return user', {
			user,
			access_token,
		});
		console.log('');

		return {
			user,
			access_token,
		};
	}

	async signUp(sessionInput: SessionInput) {
		console.log('[AuthService:signUp] Creating and loggin in new user..');
		const newUser = await this.usersService.create({ ...sessionInput });
		return await this.login(newUser);
	}
}
