import { CoinbasePro } from 'coinbase-pro-node';

interface CoinbaseProProps {
	apiKey: string;
	apiSecret: string;
	passphrase: string;
	useSandbox: boolean;
}

let coinbaseProClient: CoinbasePro;

const newCoinbasePro = ({
	apiKey,
	apiSecret,
	passphrase,
	useSandbox = false,
}: CoinbaseProProps) => {
	coinbaseProClient = new CoinbasePro({
		apiKey,
		apiSecret,
		passphrase,
		useSandbox,
	});

	return coinbaseProClient;
};

export { coinbaseProClient, newCoinbasePro };
