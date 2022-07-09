import IPriceValue from './price-value-interface';
import ITotalValue from './total-value-interface';

interface ITokenBalance {
	type: string;
	name: string;
	price: IPriceValue;
	symbol: string;
	isNft: boolean;
	chainId: string;
	balance: string;
	logoUrl: string;
	decimals: number;
	totalValue: ITotalValue;
	supportsErc?: string[];
	contractAddress: string;
}

export default ITokenBalance;
