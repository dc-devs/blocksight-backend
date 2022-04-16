import CovalentLogEvent from '../interfaces/covalent-log-event-interface';

interface Transaction {
	blockSignedAt: string;
	blockHeight: number;
	txHash: string;
	txOffset: number;
	successful: boolean;
	fromAddress: string;
	fromAddressLabel: string | null;
	toAddress: string;
	toAddressLabel: string;
	value: string;
	valueQuote: number;
	gasOffered: number;
	gasSpent: number;
	gasPrice: number;
	gasQuote: number;
	gasQuoteRate: number;
	logEvents: CovalentLogEvent[];
	isSupported: boolean;
	parsedLogEventData?: any;
}

export default Transaction;
