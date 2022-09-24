const enum ErrorMessage {
	DELETE_RECORD_NOT_FOUND = 'Record to delete does not exist.',
	UPDATE_RECORD_NOT_FOUND = 'Record to update not found.',
	TYPE_MUST_BE_A_STRING = 'type must be a string',
	AMOUNT_MUST_BE_A_STRING = 'amount must be a string',
	CURRENCY_MUST_BE_A_STRING = 'currency must be a string',
	TIMESTAMP_MUST_BE_A_DATE = 'timestamp must be a Date',
	TRANSFER_DATA_MUST_BE_A_STRING = 'transferData must be a string',
	EXCHANGE_ID_MUST_BE_A_NUMBER = 'exchangeId must be a number',
	USER_ID_MUST_BE_A_NUMBER = 'userId must be a number',
}
export default ErrorMessage;
