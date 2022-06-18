import Web3 from 'web3';
import { compareSync } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { User } from '../users/models/user.model';
import { SessionInput } from './dto/session.input';
import Cookie from '../../server/enums/cookie.enum';
import { UsersService } from '../users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import { SignInMetaMaskInput } from './dto/sign-in-metamask.input';
import {
	SignTypedDataVersion,
	recoverTypedSignature,
} from '@metamask/eth-sig-util';

import isSignedTypedDataMetaMask from '../../utils/metaMask/is-signed-typed-data-metamask';

interface ILoginRequest {
	user?: User;
	session?: any;
	sessionStore?: any;
}

interface ILoginResponse {
	cookie?: any;
}

interface ILogOutProps {
	userId: number;
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

	async validateSignedDataMetamask({
		message,
		signature,
		address,
	}: SignInMetaMaskInput) {
		try {
			const isSignedMessage = isSignedTypedDataMetaMask({
				data: message,
				signature,
				address,
			});

			if (!isSignedMessage) {
				throw new UnauthorizedException();
			}

			return isSignedMessage;
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

	logOut({ request, response, userId }: ILogOutProps) {
		request.session.userId = undefined;

		response.cookie(Cookie.NAME, null, {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			expires: new Date(Cookie.EXPIRED_DATE),
		});

		request.session.destroy();
		request.sessionStore.destroy(userId);

		return true;
	}
}
