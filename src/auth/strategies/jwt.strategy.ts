import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../users/models/user.model';
import { UsersService } from '../../users/users.service';
import { JwtConstants } from '../constants/jwt.constants';

interface Payload {
	data: User
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private usersService: UsersService) {
		super({
			ignoreExpiration: false,
			secretOrKey: JwtConstants.SECRET,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		});
	}

	validate(payload: Payload) {
		const { data } = payload;
		return this.usersService.findOne({ id: data.id });
	}
}
