import { Profile } from 'coinbase-pro-node';
import { coinbaseProClient } from './coinbase-pro-client';
import TransferType from '../interfaces/transfer-type.interface';
import { TransferInformation } from 'coinbase-pro-node/dist/transfer';

interface Options {
	profiles: Profile[];
}

const getAllCoinbaseProFiatDeposits = async ({
	profiles,
}: Options): Promise<TransferInformation[]> => {
	let allFiatDepositTransfers: TransferInformation[] = [];

	for (let i = 0; i < profiles.length; i++) {
		const profile = profiles[i];
		const { id } = profile;

		const transfers = await coinbaseProClient.rest.transfer.getTransfers(
			TransferType.DEPOSIT,
			id,
		);

		const fiatDepositTransfers = transfers.data.filter((transfer) => {
			const { details } = transfer;

			const wasTransferedToBank = details.coinbase_payment_method_id;

			return wasTransferedToBank;
		});

		allFiatDepositTransfers = [
			...allFiatDepositTransfers,
			...fiatDepositTransfers,
		];
	}

	return allFiatDepositTransfers;
};

export default getAllCoinbaseProFiatDeposits;
