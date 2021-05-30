import { CoinbasePro } from 'coinbase-pro-node';

export default new CoinbasePro({
	apiKey: process.env.COINBASE_PRO_API_KEY,
	apiSecret: process.env.COINBASE_PRO_API_SECRET,
	passphrase: process.env.COINBASE_PRO_API_PASSPHRASE,
	useSandbox: false,
});
