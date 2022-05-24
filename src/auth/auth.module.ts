import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtConstants } from './constants/jwt.constants';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from '../auth/serializers/session.serializer';

@Module({
	imports: [
		UsersModule,
		PassportModule.register({session: true}),
		JwtModule.register({
			secret: JwtConstants.SECRET,
			signOptions: { expiresIn: '999s' },
		}),
	],
	providers: [
		AuthResolver,
		AuthService,
		LocalStrategy,
		JwtStrategy,
		SessionSerializer,
	],
	exports: [AuthService],
})
export class AuthModule {}
