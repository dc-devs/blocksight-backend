const enum ErrorMessages {
	ROLE_SHOULD_NOT_EXIST = 'property role should not exist',
	PASSWORD_IS_STRING = 'password must be a string',
	PASSWORD_SHOULD_NOT_EXIST = 'property password should not exist',
	CREATED_AT_SHOULD_NOT_EXIST = 'property createdAt should not exist',
	UPDATED_AT_SHOULD_NOT_EXIST = 'property updatedAt should not exist',
	
	EXTRA_PARAM_SHOULD_NOT_EXIST = 'Cannot query field "extraParam" on type "Guser".',
	
	EMAIL_REQUIRED = 'Field "email" of required type "String!" was not provided.',
	EMAIL_MUST_BE_STRING = 'Field "email" of required type "String!" was not provided.',
	EMAIL_IS_EMAIL = 'email must be an email',
	
	PASSWORD_REQUIRED = 'Field "password" of required type "String!" was not provided.',
	PASSWORD_MUST_BE_STRING = 'Field "password" of required type "String!" was not provided.',
	PASSWORD_MIN_LENGTH = 'password must be longer than or equal to 8 characters',
}

export default ErrorMessages;
