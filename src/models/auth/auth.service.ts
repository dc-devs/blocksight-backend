import { compareSync } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { User } from '../users/models/user.model';
import { SessionInput } from './dto/session.input';
import { UsersService } from '../users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import Cookie from '../..//server/enums/cookie.enum';

interface ILoginRequest {
	user?: User;
	session?: any;
	sessionStore?: any;
}

interface ILoginResponse {
	cookie?: any;
}

interface ILogOutProps {
	user: User;
	request: ILoginRequest;
	response: ILoginResponse;
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

	async login(request: ILoginRequest) {
		const { user } = request;

		if (user && request.session) {
			request.session.userId = user.id;
		} else {
			throw new UnauthorizedException();
		}

		return user;
	}

	logOut({ request, response, user }: ILogOutProps) {
		const { id } = user;

		request.session.userId = undefined;

		response.cookie(Cookie.NAME, null, {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			expires: new Date('Thu, 01 Jan 1970 00:00:00 UTC'),
		});

		request.session.destroy();
		request.sessionStore.destroy(id);

		return true;
	}
}
