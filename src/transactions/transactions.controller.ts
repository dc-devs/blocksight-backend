import { Controller, Get, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import TransactionsQueryParams from './interfaces/transactions-query-params-interface';

@Controller()
export class TransactionsController {
	constructor(private readonly transactionsService: TransactionsService) {}

	@Get('transactions')
	async getTransactions(@Query() query: TransactionsQueryParams) {
		const { address, filter, currency } = query;
		const TokenBalances = await this.transactionsService.getTransactions({
			filter,
			address,
			currency,
		});

		return TokenBalances;
	}
}
