import { ExchangeName } from '../../src/models/exchanges/enums';

const coinbase = {
	name: ExchangeName.COINBASE,
	websiteUrl: 'https://www.coinbase.com/',
	logoUrl:
		'https://blocksight.s3.amazonaws.com/images/exchanges/coinbase-logo.png',
	companyLogoUrl:
		'https://blocksight.s3.amazonaws.com/images/exchanges/coinbase-company-logo.png',
};

const coinbasePro = {
	name: ExchangeName.COINBASE_PRO,
	websiteUrl: 'https://pro.coinbase.com/',
	logoUrl:
		'https://blocksight.s3.amazonaws.com/images/exchanges/coinbase-pro-logo.png',
	companyLogoUrl:
		'https://blocksight.s3.amazonaws.com/images/exchanges/coinbase-pro-company-logo.png',
};

const cryptoCom = {
	name: ExchangeName.CRYPTO_COM,
	websiteUrl: 'https://crypto.com/',
	logoUrl:
		'https://blocksight.s3.amazonaws.com/images/exchanges/crypto-com-logo.png',
	companyLogoUrl:
		'https://blocksight.s3.amazonaws.com/images/exchanges/crypto-com-company-logo.png',
};

const kuCoin = {
	name: ExchangeName.KU_COIN,
	websiteUrl: 'https://www.kucoin.com/',
	logoUrl:
		'https://blocksight.s3.amazonaws.com/images/exchanges/kucoin-logo.png',
	companyLogoUrl:
		'https://blocksight.s3.amazonaws.com/images/exchanges/kucoin-company-logo.png',
};

const exchanges = [coinbase, coinbasePro, cryptoCom, kuCoin];

export { coinbase, coinbasePro, exchanges };
