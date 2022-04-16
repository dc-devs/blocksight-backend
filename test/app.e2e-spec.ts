import * as request from 'supertest';
import initializeTestApp from './config/initializeTestApp';
import { INestApplication, HttpStatus } from '@nestjs/common';

// TODO: Connect to a TEST DB..

describe('App (e2e)', () => {
	let app: INestApplication;

	beforeAll(async () => {
		app = await initializeTestApp();
	});

	afterAll(async () => {
		await app.close();
	});

	describe('/ping', () => {
		it("should return 'pong'", () => {
			return request(app.getHttpServer())
				.get('/ping')
				.expect(HttpStatus.OK)
				.then(({ body }) => {
					expect(body).toEqual({ message: 'pong' });
				});
		});
	});
});
