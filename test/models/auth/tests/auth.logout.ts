import request from 'supertest';
import Cookie from '../../../../src/server/enums/cookie.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import {
	testApp,
	initializeTestApp,
} from '../../../helpers/init/initializeTestApp';
import getCookieFromResponse from '../../../helpers/utils/get-cookie-from-response';

const runLogOutTests = () => {
	describe('Log Out', () => {
		let app: INestApplication;

		beforeAll(async () => {
			if (testApp) {
				app = testApp;
			} else {
				app = await initializeTestApp();
			}
		});

		describe('when logging out', () => {
			const testUserId = 1;

			it('should logout user', async () => {
				const query = {
					operationName: 'Mutation',
					query: `
						mutation Mutation($userId: Float!) {
  							logOut(userId: $userId) {
								userId
								isAuthenticated
							}
						}`,
					variables: {
						userId: testUserId,
					},
				};
				const response = (await request(app.getHttpServer())
					.post('/graphql')
					.set('x-forwarded-proto', 'https')
					.send(query)) as any;

				const { logOut } = response.body.data;
				const { isAuthenticated, userId } = logOut;

				const cookie = getCookieFromResponse(response);

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(userId).toEqual(testUserId);
				expect(isAuthenticated).toEqual(false);
				expect(cookie.includes(Cookie.NAME)).toEqual(true);
				expect(cookie.includes(Cookie.EXPIRED_DATE)).toEqual(true);
			});
		});
	});
};

export default runLogOutTests;
