const userId = 1;

const userExchanceCoinbase = {
	userId: userId,
	exchangeId: 1,
};

const userExchanceCoinbasePro = {
	userId: userId,
	exchangeId: 2,
};

const userExchanceCryptoCom = {
	userId: userId,
	exchangeId: 3,
};

const userExchanceKuCoin = { userId: userId, exchangeId: 4 };

const usersExchanges = [
	userExchanceCoinbase,
	userExchanceCoinbasePro,
	userExchanceCryptoCom,
	userExchanceKuCoin,
];

const firstRecord = userExchanceCoinbase;

export { usersExchanges, firstRecord };
