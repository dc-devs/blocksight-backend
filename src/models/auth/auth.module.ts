import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';

@Module({
	imports: [UsersModule],
	providers: [AuthResolver, AuthService],
	exports: [AuthService],
})
export class AuthModule {}
