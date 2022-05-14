import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtConstants } from './constants/jwt.constants';
import { LocalStrategy } from './strategies/local.strategy';

describe('AuthResolver', () => {
	let resolver: AuthResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				UsersModule,
				PassportModule,
				JwtModule.register({
					secret: JwtConstants.SECRET,
					signOptions: { expiresIn: '60s' },
				}),
			],
			providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
		}).compile();

		resolver = module.get<AuthResolver>(AuthResolver);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
