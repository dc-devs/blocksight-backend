import Cookie from '../../../src/server/enums/cookie.enum';

const responseContainsSetCookie = (response: any) => {
	const { rawHeaders } = response.res;

	const cookieHeaders = rawHeaders.filter((header: string) => {
		return header.match(Cookie.SET_COOKIE) || header.match(Cookie.NAME);
	});

	const dedupedCookieHeaders = [...new Set(cookieHeaders)];

	return dedupedCookieHeaders.length === 2;
};

export default responseContainsSetCookie;
