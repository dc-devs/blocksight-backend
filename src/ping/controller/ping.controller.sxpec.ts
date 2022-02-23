import { Test, TestingModule } from '@nestjs/testing';
import { PingController } from './ping.controller';

describe('PingController', () => {
	let controller: PingController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PingController],
		}).compile();

		controller = module.get<PingController>(PingController);
	});

	describe('ping', () => {
		it('should be defined', () => {
			expect(controller.ping).toBeDefined();
		});

		describe('when called', () => {
			it("should return 'pong'", () => {
				expect(controller.ping()).toContainEqual({ message: 'pong' });
			});
		});
	});
});
