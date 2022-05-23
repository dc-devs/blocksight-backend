import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '../../users/models/user.model';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({ usernameField: 'email' });
	}

	async validate(email: string, password: string): Promise<User | null> {
		console.log('');
		console.log(
			'[LocalStrategy:validate] Calling authService.validateUser',
			email,
			password,
		);
		console.log('');
		const user = await this.authService.validateUser(email, password);

		if (!user) {
			throw new UnauthorizedException();
		}

		console.log('');
		console.log('[LocalStrategy:validate] returning User', user);
		console.log('');

		return user;
	}
}
