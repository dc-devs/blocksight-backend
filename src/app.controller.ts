import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';

@Controller()
export class AppController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('auth/login')
	async login(@Request() req) {
		console.log('');
		console.log('[AppController]:: authService.login', req.user);
		console.log('');
		return this.authService.login(req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Request() req) {
		console.log('');
		console.log('[AppController]:: profile', req.user);
		console.log('');
		return req.user;
	}
}
