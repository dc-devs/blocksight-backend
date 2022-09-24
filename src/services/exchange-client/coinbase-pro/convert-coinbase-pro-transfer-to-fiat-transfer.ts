import { Currency } from '../../../common/enums';
import { TransferInformation } from 'coinbase-pro-node/dist/transfer';
import { CreateFiatTransferInput } from '../../../models/fiat-transfers/dto/inputs/create-fiat-transfer.input';

interface Options {
	userId: number;
	exchangeId: number;
	transfer: TransferInformation;
}

const convertCoinbaseProTransferToFiatTransfer = ({
	userId,
	transfer,
	exchangeId,
}: Options): CreateFiatTransferInput => {
	let fiatTransfer: CreateFiatTransferInput = {};
	const { type, amount, completed_at } = transfer;

	fiatTransfer = {
		type,
		amount,
		userId,
		exchangeId,
		timestamp: new Date(completed_at),
		transferData: JSON.stringify(transfer),
		currency: Currency.USD,
	};

	return fiatTransfer;
};

export default convertCoinbaseProTransferToFiatTransfer;
