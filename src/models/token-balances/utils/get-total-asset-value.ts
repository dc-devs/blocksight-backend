import BigNumber from 'bignumber.js';
import CovalentTokenBalances from '../../../interfaces/covalent-token-balance-interface';

interface Props {
	tokenBalances: CovalentTokenBalances[];
}

const getTotalAssetValue = ({ tokenBalances }: Props) => {
	let totalAssetValue = new BigNumber(0);

	if (tokenBalances.length > 0) {
		tokenBalances.forEach((tokenBalance) => {
			const { quote } = tokenBalance;

			totalAssetValue = totalAssetValue.plus(quote);
		});
	}

	return totalAssetValue;
};

export default getTotalAssetValue;
