interface Interval {
	volume: string;
	price_change: string;
	price_change_pct: string;
	volume_change: string;
	volume_change_pct: string;
	[key: string]: string;
}

interface NomicsTokenData {
	id: string;
	currency: string;
	symbol: string;
	name: string;
	logo_url: string;
	status: string;
	price: string;
	price_date: string;
	price_timestamp: string;
	market_cap_dominance: string;
	num_exchanges: string;
	num_pairs: string;
	num_pairs_unmapped: string;
	first_candle: string;
	first_order_book: string;
	first_priced_at: string;
	rank: string;
	rank_delta: string;
	high: string;
	high_timestamp: string;
	'1h': Interval;
	'1d': Interval;
	'7d': Interval;
	'30d': Interval;
	'365d': Interval;
	ytd: Interval;
	[key: string]: string | Interval;
}

export default NomicsTokenData;
