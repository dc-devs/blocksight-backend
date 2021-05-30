import { Controller, Get } from '@nestjs/common';
import { TransfersService } from './transfers.service';

@Controller('transfers')
export class TransfersController {
	constructor(private readonly coinbaseService: TransfersService) {}

	@Get('total-fiat-deposits')
	async getDeposits() {
		const deposits = await this.coinbaseService.getTotalFiatDeposits();

		return deposits;
	}

	@Get('total-fiat-withdrawls')
	async getWithdrawls() {
		const withdrawls = await this.coinbaseService.getTotalFiatWithdrawls();

		return withdrawls;
	}
}
