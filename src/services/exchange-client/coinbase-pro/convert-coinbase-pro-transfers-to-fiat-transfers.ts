import { TransferInformation } from 'coinbase-pro-node/dist/transfer';
import { CreateFiatTransferInput } from '../../../models/fiat-transfers/dto/inputs/create-fiat-transfer.input';
import convertCoinbaseProTransferToFiatTransfer from './convert-coinbase-pro-transfer-to-fiat-transfer';

interface Options {
	exchangeId: number;
	transfers: TransferInformation[];
}

const convertCoinbaseProTransfersToFiatTransfers = ({
	transfers,
	exchangeId,
}: Options): CreateFiatTransferInput[] => {
	return transfers.map((transfer) => {
		const createFiatTransferInput =
			convertCoinbaseProTransferToFiatTransfer({
				transfer,
				exchangeId,
			});

		return createFiatTransferInput;
	});
};

export default convertCoinbaseProTransfersToFiatTransfers;
