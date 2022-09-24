import { Profile } from 'coinbase-pro-node';
import { coinbaseProClient } from './coinbase-pro-client';
import TransferType from '../interfaces/transfer-type.interface';
import { TransferInformation } from 'coinbase-pro-node/dist/transfer';

interface Options {
	profiles: Profile[];
}

const getAllCoinbaseProFiatWithdrawls = async ({
	profiles,
}: Options): Promise<TransferInformation[]> => {
	let allFiatWithdrawlTransfers: TransferInformation[] = [];

	for (let i = 0; i < profiles.length; i++) {
		const profile = profiles[i];
		const { id } = profile;

		const transfers = await coinbaseProClient.rest.transfer.getTransfers(
			TransferType.WITHDRAW,
			id,
		);

		const fiatWithdrawlTransfers = transfers.data.filter((transfer) => {
			const { details } = transfer;

			const wasTransferedToBank = details.coinbase_payment_method_id;

			return wasTransferedToBank;
		});

		allFiatWithdrawlTransfers = [
			...allFiatWithdrawlTransfers,
			...fiatWithdrawlTransfers,
		];
	}

	return allFiatWithdrawlTransfers;
};

export default getAllCoinbaseProFiatWithdrawls;
