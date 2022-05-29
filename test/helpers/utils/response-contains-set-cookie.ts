import Cookie from '../../../src/server/enums/cookie.enum';

const responseContainsSetCookie = (response: any) => {
	const { rawHeaders } = response.res;

	const cookieHeaders = rawHeaders.filter((header: string) => {
		return header.match(Cookie.SET_COOKIE) || header.match(Cookie.NAME);
	});

	console.log(cookieHeaders);

	return cookieHeaders.length === 2;
};

export default responseContainsSetCookie;
