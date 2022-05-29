const getCookieFromResponse = (response: any) => {
	let cookieId;
	const { rawHeaders } = response.res;
	
	console.log(rawHeaders);

	rawHeaders.forEach((header: string) => {
		const cookieIdRegex = /connect.sid=(?<cookieId>.+);\sPath/;
		const matches = header.match(cookieIdRegex);

		if (matches) {
			const { groups } = matches;
			cookieId = groups.cookieId;
		}
	});

	return cookieId;
};

export default getCookieFromResponse;
