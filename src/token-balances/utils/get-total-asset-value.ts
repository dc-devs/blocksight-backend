import BigNumber from 'bignumber.js';
import CovalentTokenBalances from '../../interfaces/covalent-token-balance-interface';

interface Props {
	TokenBalancess: CovalentTokenBalances[];
}

const getTotalAssetValue = ({ TokenBalancess }: Props) => {
	let totalAssetValue = new BigNumber(0);

	if (TokenBalancess.length > 0) {
		TokenBalancess.forEach((TokenBalances) => {
			const { quote } = TokenBalances;

			totalAssetValue = totalAssetValue.plus(quote);
		});
	}

	return totalAssetValue;
};

export default getTotalAssetValue;
