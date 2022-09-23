import { coinbaseProClient } from './coinbase-pro-client';
import TransferType from '../interfaces/transfer-type.interface';

interface Props {
	transferType: TransferType;
}

const getCoinbaseProFiatTransfers = async ({ transferType }: Props) => {
	const profiles = await coinbaseProClient.rest.profile.listProfiles();
	const { id } = profiles[0];

	const transfers = await coinbaseProClient.rest.transfer.getTransfers(
		transferType,
		id,
	);

	return transfers;
};

export default getCoinbaseProFiatTransfers;
