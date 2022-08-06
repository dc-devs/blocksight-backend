const enum ErrorMessage {
	DELETE_RECORD_NOT_FOUND = 'Record to delete does not exist.',
	UPDATE_RECORD_NOT_FOUND = 'Record to update not found.',
	USER_ID_MUST_BE_A_NUMBER = 'userId must be a number conforming to the specified constraints',
	EXCHANGE_ID_MUST_BE_A_NUMBER = 'exchangeId must be a number conforming to the specified constraints',
}
export default ErrorMessage;
