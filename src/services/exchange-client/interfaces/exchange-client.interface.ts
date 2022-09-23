import GetFiatTansfersProps from './get-fiat-transfers-props.interface';

interface ExchangeClient {
	getFiatTansfers: ({ transferType }: GetFiatTansfersProps) => Promise<{}>;
}

export default ExchangeClient;
