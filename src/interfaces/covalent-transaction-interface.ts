import CovalentLogEvent from 'src/interfaces/covalent-log-event-interface';

interface CovalentTransaction {
	block_signed_at: string;
	block_height: number;
	tx_hash: string;
	tx_offset: number;
	successful: boolean;
	from_address: string;
	from_address_label: string | null;
	to_address: string;
	to_address_label: string | null;
	value: string;
	value_quote: number;
	gas_offered: number;
	gas_spent: number;
	gas_price: number;
	gas_quote: number;
	gas_quote_rate: number;
	log_events: CovalentLogEvent[];
}

export default CovalentTransaction;
