import { Injectable } from '@nestjs/common';
import TransactionsQueryParams from './interfaces/transactions-query-params-interface';
import getTranactions from '../services/etherscan/get-transactions';

@Injectable()
export class TransactionsService {
	async getTransactions({ address }: TransactionsQueryParams) {
		const transactions = await getTranactions(address);
		return transactions;
	}
}
