const enum ErrorMessage {
	EXTRA_PARAM_SHOULD_NOT_EXIST = 'Cannot query field "extraParam" on type "Exchange".',
	UPDATE_RECORD_NOT_FOUND = 'Record to update not found.',
	DELETE_RECORD_NOT_FOUND = 'Record to delete does not exist.',
	NAME_MUST_BE_A_STRING = 'name must be a string',
	WEBSITE_URL_MUST_BE_A_STRING = 'websiteUrl must be a string',
	LOGO_URL_MUST_BE_A_STRING = 'logoUrl must be a string',
	COMPANY_LOGO_URL_MUST_BE_A_STRING = 'companyLogoUrl must be a string',
	HAS_API_MUST_BE_A_BOOLEAN = 'hasApi must be a boolean value',
	HAS_CSV_MUST_BE_A_BOOLEAN = 'hasCsv must be a boolean value',
}

export default ErrorMessage;
