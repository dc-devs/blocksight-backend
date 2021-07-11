import { Injectable } from '@nestjs/common';
import TransactionsQueryParams from 'src/transactions/interfaces/transactions-query-params-interface';
import getCovelantTransactions from 'src/services/covelant/get-covalent-transactions';
import parseCovalentTransaction from 'src/transactions/utils/parse-transactions/covalent/parse-covalent-transaction';

@Injectable()
export class TransactionsService {
	async getTransactions({
		address,
		filter,
		currency,
	}: TransactionsQueryParams) {
		const transactions = await getCovelantTransactions({
			address,
			filter,
			currency,
		});

		const successfulTransactions = transactions.filter((transaction) => {
			return transaction.successful === true;
		});

		const supportedTransactions = [];
		const nonSupportedTransactions = [];

		for (let i = 0; i < successfulTransactions.length; i++) {
			const transaction = successfulTransactions[i];
			const parsedTransaction = parseCovalentTransaction(transaction);

			if (parsedTransaction.isSupported) {
				supportedTransactions.push(parsedTransaction);
			} else {
				nonSupportedTransactions.push(transaction);
			}
		}

		const percentSupported =
			supportedTransactions.length / nonSupportedTransactions.length;

		return {
			percentSupported,
			supportedTransactions,
			nonSupportedTransactions,
		};
	}
}
