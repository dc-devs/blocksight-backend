import { Currency } from '../../src/common/enums';

const userId = 1;

const generateFiatTransfers = (type: string, count: number) => {
	const transfers = [];

	for (let i = 0; i <= count; i++) {
		const isEvenNumber = i % 2 == 0;
		const exchangeId = isEvenNumber ? 1 : 2;
		const transfer = {
			type,
			userId,
			exchangeId,
			amount: i.toString(),
			currency: Currency.USD,
			timestamp: new Date().toISOString(),
			transferData: JSON.stringify({ originalData: 'data' }),
		};

		transfers.push(transfer);
	}

	return transfers;
};

const deposits = generateFiatTransfers('deposit', 10);
const withdrawls = generateFiatTransfers('withdraw', 10);

const fiatTransfers = [...deposits, ...withdrawls];
const allModelsCount = fiatTransfers.length;
const firstRecord = fiatTransfers[0];

export { fiatTransfers, deposits, firstRecord, allModelsCount };
