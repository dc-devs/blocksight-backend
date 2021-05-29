interface CovalentTokenBalance {
	contract_decimals: number;
	contract_address: string;
	logo_url: string;
	contract_name: string;
	contract_ticker_symbol: string;
	balance: string;
	supports_erc: string[];
	type: string;
	nft_data: string | null;
	quote: number;
	quote_rate: number;
	[key: string]: number | null | string | string[];
}

export default CovalentTokenBalance;
