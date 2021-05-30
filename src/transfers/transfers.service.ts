import { Injectable } from '@nestjs/common';
import TransferType from './interfaces/transfer-type-interface';
import getCoinbaseTotalFiatTransferred from './services/coinbase/get-coinbase-total-fiat-transferred';

// https://bennycode.com/coinbase-pro-node/#/
@Injectable()
export class TransfersService {
	async getTotalFiatDeposits() {
		const totalFiatDeposits = getCoinbaseTotalFiatTransferred({
			transferType: TransferType.DEPOSIT,
		});
		return totalFiatDeposits;
	}

	async getTotalFiatWithdrawls() {
		const totalFiatWithdraws = getCoinbaseTotalFiatTransferred({
			transferType: TransferType.WITHDRAW,
		});
		return totalFiatWithdraws;
	}
}
