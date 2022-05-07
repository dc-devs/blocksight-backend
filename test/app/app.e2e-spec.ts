import * as request from 'supertest';
import initializeTestApp from '../init/initializeTestApp';
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
		it("should return 'pong'", async () => {
			const response = await request(app.getHttpServer()).get('/ping');

			expect(response.statusCode).toEqual(HttpStatus.OK);
			expect(response.body).toEqual({ message: 'pong' });
		});
	});
});
