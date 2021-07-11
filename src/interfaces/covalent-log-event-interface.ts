import CovalentLogEventDecoded from './covalent-log-event-decoded-interface';

interface CovalentLogEvent {
	block_signed_at: string;
	block_height: number;
	tx_offset: number;
	log_offset: number;
	tx_hash: string;
	_raw_log_topics_bytes: null;
	raw_log_topics: string[];
	sender_contract_decimals: 18;
	sender_name: string;
	sender_contract_ticker_symbol: string;
	sender_address: string;
	sender_address_label: string | null;
	sender_logo_url: string;
	raw_log_data: string;
	decoded: CovalentLogEventDecoded;
}

export default CovalentLogEvent;
