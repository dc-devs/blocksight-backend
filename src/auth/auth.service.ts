import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}

	async validateUser(userEmail: string, userPassword: string): Promise<any> {
		const user = await this.usersService.findOne({ email: userEmail });
		if (user && user.password === userPassword) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}
}
