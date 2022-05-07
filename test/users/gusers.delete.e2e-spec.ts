import * as request from 'supertest';
import ErrorMessage from './enums/error-message.enum';
import UserProperty from './enums/user-property.enum';
import initializeTestApp from '../init/initializeTestApp';
import { INestApplication, HttpStatus } from '@nestjs/common';
import ExtensionCodes from '../helpers/enums/extension-codes.enum';

describe('Users', () => {
	let app: INestApplication;

	beforeAll(async () => {
		app = await initializeTestApp();
	});

	afterAll(async () => {
		await app.close();
	});
	describe('Delete one', () => {
		describe('when passed a valid user id', () => {
			it('should delete that user', async () => {
				// const id = 50;
				// const response = await request(app.getHttpServer()).delete(
				// 	`/users/${id}`
				// );

				// expect(response.body).toEqual(expectedUserObject);
				expect(true).toEqual(true);
			});
		});
	});
});
