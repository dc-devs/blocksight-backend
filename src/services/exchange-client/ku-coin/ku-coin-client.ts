class KuCoinClient {
	constructor() {}
}

let kucoinClient: KuCoinClient;

const newKuCoinClient = () => {
	return kucoinClient;
};

export { newKuCoinClient, kucoinClient };
