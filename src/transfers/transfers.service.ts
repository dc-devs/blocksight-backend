import { Injectable } from '@nestjs/common';
import TransferType from './interfaces/transfer-type-interface';
import getCoinbaseTotalFiatTransferred from './services/coinbase/get-coinbase-total-fiat-transferred';

// https://bennycode.com/coinbase-pro-node/#/
@Injectable()
export class TransfersService {
	async getTotalFiatDeposits() {
		const depositTransfers = await getCoinbaseTotalFiatTransferred({
			transferType: TransferType.DEPOSIT,
		});

		const fiatDepositTransfers = depositTransfers.transfers.data.filter(
			(transfer) => {
				const { details } = transfer;

				const wasTransferedToBank = details.coinbase_payment_method_id;

				return wasTransferedToBank;
			},
		);

		return fiatDepositTransfers;
	}

	async getTotalFiatWithdrawls() {
		const withdrawlTransfers = await getCoinbaseTotalFiatTransferred({
			transferType: TransferType.WITHDRAW,
		});

		const fiatWithdrawlTransfers = withdrawlTransfers.transfers.data.filter(
			(transfer) => {
				const { details } = transfer;

				const wasTransferedToBank = details.coinbase_payment_method_id;

				return wasTransferedToBank;
			},
		);

		return fiatWithdrawlTransfers;
	}
}
