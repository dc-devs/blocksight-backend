import Cookie from '../../../src/server/enums/cookie.enum';

const getCookieFromResponse = (response: any) => {
	const { rawHeaders } = response.res;

	const cookie = rawHeaders.find((header: string) => {
		return header.match(Cookie.NAME);
	});

	return cookie;
};

export default getCookieFromResponse;
