import { BigNumber } from 'bignumber.js';
import { FiatTransfer } from '../dto/models/fiat-transfer.model';
import formatToCurrency from '../../token-balances/utils/format-to-currency';
import { CryptoAssetsChartDataPoint } from '../../../charts/crypto-assets-chart/dto/models/crypto-assets-chart-data-point.model';
interface IOptions {
	fiatTransfers: FiatTransfer[];
}

enum BigNumOperationMap {
	deposit = 'plus',
	withdraw = 'minus',
}

const getWorkingFiatChartDataPoints = ({
	fiatTransfers,
}: IOptions): CryptoAssetsChartDataPoint[] => {
	let currentWorkingFiat = new BigNumber(0);
	const dataPoints: CryptoAssetsChartDataPoint[] = [];

	fiatTransfers.forEach((fiatTransfer) => {
		const { type, amount, timestamp } = fiatTransfer;
		const bigNumOperation = BigNumOperationMap[type];

		currentWorkingFiat = currentWorkingFiat[bigNumOperation](amount);
		console.log('currentWorkingFiat', currentWorkingFiat.toFixed(2));

		console.log({
			amount,
			timestamp,
		});

		const currentDataPoint = {
			date: timestamp.toUTCString(),
			workingFiat: currentWorkingFiat.toFixed(2),
		};

		dataPoints.push({
			...currentDataPoint,
		});
	});

	return dataPoints;
};

export default getWorkingFiatChartDataPoints;
