import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({ usernameField: 'email' });
	}

	async validate(email: string, password: string): Promise<any> {
		console.log('');
		console.log('[LocalStrategy]::validateUser', email, password);
		console.log('');
		const user = await this.authService.validateUser(email, password);
		console.log('[LocalStrategy]::user', user);
		console.log('');
		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
