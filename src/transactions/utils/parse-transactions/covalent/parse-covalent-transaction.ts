import CovalentTransaction from 'src/interfaces/covalent-transaction-interface';
import Transaction from 'src/interfaces/transaction-interface';
import contractAddressExchangeMap from 'src/mock-db/contract-address-exchange-map';
import contractAddressParseEventlogsMap from 'src/mock-db/contract-address-parse-logs-map';

const parseUniswapTransaction = (
	transaction: CovalentTransaction
): Transaction => {
	const {
		block_signed_at,
		block_height,
		tx_hash,
		tx_offset,
		successful,
		from_address,
		from_address_label,
		to_address,
		to_address_label,
		value,
		value_quote,
		gas_offered,
		gas_spent,
		gas_price,
		gas_quote,
		gas_quote_rate,
		log_events,
	} = transaction;

	const toAddress = to_address.toLowerCase();
	const isSupported = !!contractAddressExchangeMap[toAddress];
	const logEvents = log_events;
	let parsedLogEventData;

	if (isSupported) {
		const parseLogEvents = contractAddressParseEventlogsMap[toAddress];
		parsedLogEventData = parseLogEvents(logEvents);
		console.log(parsedLogEventData);
	}

	return {
		blockSignedAt: block_signed_at,
		blockHeight: block_height,
		txHash: tx_hash,
		txOffset: tx_offset,
		successful,
		fromAddress: from_address,
		fromAddressLabel: from_address_label,
		toAddress: to_address,
		toAddressLabel: to_address_label,
		value,
		valueQuote: value_quote,
		gasOffered: gas_offered,
		gasSpent: gas_spent,
		gasPrice: gas_price,
		gasQuote: gas_quote,
		gasQuoteRate: gas_quote_rate,
		logEvents,
		isSupported,
		parsedLogEventData,
	};
};

export default parseUniswapTransaction;
