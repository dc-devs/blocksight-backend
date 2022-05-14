import { LocalAuthGuard } from './auth/local-auth.guard';
import { Controller, Request, Post, UseGuards } from '@nestjs/common';

@Controller()
export class AppController {
	@UseGuards(LocalAuthGuard)
	@Post('auth/login')
	async login(@Request() req) {
		console.log('');
		console.log('[AppController:: Return User]', req.body);
		console.log('');
		return req.user;
	}
}
