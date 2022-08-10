const enum ErrorMessage {
	DELETE_RECORD_NOT_FOUND = 'Record to delete does not exist.',
	UPDATE_RECORD_NOT_FOUND = 'Record to update not found.',
	USER_ID_MUST_BE_A_NUMBER = 'userId must be a number',
	EXCHANGE_ID_MUST_BE_A_NUMBER = 'exchangeId must be a number',
	API_KEY_MUST_BE_A_STRING = 'apiKey must be a string',
	API_SECRET_MUST_BE_A_STRING = 'apiSecret must be a string',
	API_PASSPHRASE_MUST_BE_A_STRING = 'apiPassphrase must be a string',
	API_NICKNAME_MUST_BE_A_STRING = 'apiNickname must be a string',
}
export default ErrorMessage;
