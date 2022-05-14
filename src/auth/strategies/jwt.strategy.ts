import { Injectable } from '@nestjs/common';
import { JwtConstants } from '../constants/jwt.constants';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private usersService: UsersService) {
		super({
			ignoreExpiration: false,
			secretOrKey: JwtConstants.SECRET,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		});
	}

	validate(payload: any) {
		console.log('');
		console.log('[JwtStrategy]::validate', payload);
		console.log('');
		return this.usersService.findOne({ id: payload.sub });
	}
}
