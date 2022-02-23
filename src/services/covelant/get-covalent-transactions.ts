import axios from 'axios';
import TransactionsQueryParams from '../../transactions/interfaces/transactions-query-params-interface';
import CovalentTransaction from '../../interfaces/covalent-transaction-interface';

const getCovalentTransactions = async ({
	filter,
	address,
	currency,
}: TransactionsQueryParams): Promise<CovalentTransaction[]> => {
	const chainId = process.env.ETHEREUM_CHAIN_ID;
	const convalentApiKey = process.env.COVALENT_API_KEY;
	let url = `https://api.covalenthq.com/v1/${chainId}/address/${address}/transactions_v2/?key=${convalentApiKey}&quote-currency=${currency}`;

	if (filter) {
		const filterUppercase = filter.toLocaleUpperCase();
		url += `&match={"contract_ticker_symbol":"${filterUppercase}"}`;
	}

	const response: any = await axios.get(url);
	const { data } = response.data;
	const { items } = data;

	return items;
};

export default getCovalentTransactions;
