import {
	ExchangeName,
	ExchangeWebsite,
} from '../../src/models/exchanges/enums';

const coinbase = {
	name: ExchangeName.COINBASE,
	websiteUrl: ExchangeWebsite.COINBASE,
	logoUrl:
		'https://blocksight.s3.amazonaws.com/images/exchanges/coinbase-logo.png',
	companyLogoUrl:
		'https://blocksight.s3.amazonaws.com/images/exchanges/coinbase-company-logo.png',
	hasApi: true,
	hasCsv: true,
};

const coinbasePro = {
	name: ExchangeName.COINBASE_PRO,
	websiteUrl: ExchangeWebsite.COINBASE_PRO,
	logoUrl:
		'https://blocksight.s3.amazonaws.com/images/exchanges/coinbase-pro-logo.png',
	companyLogoUrl:
		'https://blocksight.s3.amazonaws.com/images/exchanges/coinbase-pro-company-logo.png',
	hasApi: true,
	hasCsv: true,
};

const cryptoCom = {
	name: ExchangeName.CRYPTO_COM,
	websiteUrl: ExchangeWebsite.CRYPTO_COM,
	logoUrl:
		'https://blocksight.s3.amazonaws.com/images/exchanges/crypto-com-logo.png',
	companyLogoUrl:
		'https://blocksight.s3.amazonaws.com/images/exchanges/crypto-com-company-logo.png',
	hasApi: false,
	hasCsv: true,
};

const kuCoin = {
	name: ExchangeName.KU_COIN,
	websiteUrl: ExchangeWebsite.KU_COIN,
	logoUrl:
		'https://blocksight.s3.amazonaws.com/images/exchanges/kucoin-logo.png',
	companyLogoUrl:
		'https://blocksight.s3.amazonaws.com/images/exchanges/kucoin-company-logo.png',
	hasApi: true,
	hasCsv: true,
};

const exchanges = [coinbase, coinbasePro, cryptoCom, kuCoin];
const allExchangesCount = exchanges.length;

export { coinbase, coinbasePro, exchanges, allExchangesCount };
