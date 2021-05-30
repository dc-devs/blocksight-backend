import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TokenDataModule } from './token-data/token-data.module';
import { CoinbaseModule } from './transfers/transfers.module';

@Module({
	imports: [UsersModule, TokenDataModule, CoinbaseModule],
	controllers: [],
	providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
