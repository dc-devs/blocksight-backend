import { CreateFiatTransferInput } from '../../../models/fiat-transfers/dto/inputs/create-fiat-transfer.input';

interface ExchangeClient {
	getAllExchangeFiatTansfers: () => Promise<any[]>;
	getAllFiatTansfers: () => Promise<CreateFiatTransferInput[]>;
}

export default ExchangeClient;
