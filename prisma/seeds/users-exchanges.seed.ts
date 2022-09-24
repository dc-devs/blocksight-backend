const userId = 1;

const userExchangeCoinbase = {
	userId: userId,
	exchangeId: 1,
	apiKey: 'apiKey',
	apiSecret: 'apiSecret',
	apiPassphrase: 'apiPassphrase',
	apiNickname: 'apiNickname',
};

const userExchangeCoinbasePro = {
	userId: userId,
	exchangeId: 2,
	apiKey: 'apiKey',
	apiSecret: 'apiSecret',
	apiPassphrase: 'apiPassphrase',
	apiNickname: 'apiNickname',
};

const userExchangeCryptoCom = {
	userId: userId,
	exchangeId: 3,
	apiKey: 'apiKey',
	apiSecret: 'apiSecret',
	apiPassphrase: 'apiPassphrase',
	apiNickname: 'apiNickname',
};

const userExchangeKuCoin = {
	userId: userId,
	exchangeId: 4,
	apiKey: 'apiKey',
	apiSecret: 'apiSecret',
	apiPassphrase: 'apiPassphrase',
	apiNickname: 'apiNickname',
};

const usersExchanges = [
	userExchangeCoinbase,
	userExchangeCoinbasePro,
	userExchangeCryptoCom,
	userExchangeKuCoin,
];

const firstRecord = userExchangeCoinbase;
const allModelsCount = usersExchanges.length;

export { usersExchanges, firstRecord, allModelsCount };
