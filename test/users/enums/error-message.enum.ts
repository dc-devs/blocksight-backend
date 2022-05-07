const enum ErrorMessage {
	RECORD_NOT_FOUND = 'Record to update not found',
	EMAIL_REQUIRED = 'Field "email" of required type "String!" was not provided.',
	EMAIL_MUST_BE_STRING = 'Field "email" of required type "String!" was not provided.',
	EMAIL_IS_EMAIL = 'email must be an email',
	PASSWORD_REQUIRED = 'Field "password" of required type "String!" was not provided.',
	PASSWORD_MUST_BE_STRING = 'Field "password" of required type "String!" was not provided.',
	PASSWORD_MIN_LENGTH = 'password must be longer than or equal to 8 characters',
	PASSWORD_FIELD_NOT_DEFINED = 'Field "password" is not defined',
	ROLE_FIELD_NOT_DEFINED = 'Field "role" is not defined',
	EXTRA_PARAM_SHOULD_NOT_EXIST = 'Cannot query field "extraParam" on type "Guser".',
}

export default ErrorMessage;
