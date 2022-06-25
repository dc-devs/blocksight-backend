import IValue from './value-interface';

interface ITokenBalance {
	type: string;
	name: string;
	price: IValue;
	symbol: string;
	balance: string;
	logoUrl: string;
	decimals: number;
	totalValue: IValue;
	supportsErc?: string[];
	contractAddress: string;
}

export default ITokenBalance;
