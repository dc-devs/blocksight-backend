import TransferType from '../../interfaces/transfer-type-interface';
import coinbaseProClient from './coinbase-pro-client';
// import getTransfersTotalFiatValue from './get-transfers-total-fiat-value';

interface Props {
	transferType: TransferType;
}

const getCoinbaseTotalFiatTransferred = async ({ transferType }: Props) => {
	const profiles = await coinbaseProClient.rest.profile.listProfiles();
	const { id } = profiles[0];

	const transfers = await coinbaseProClient.rest.transfer.getTransfers(
		transferType,
		id,
	);
	// const { data } = transfers;

	// const totalDeposits = getTransfersTotalFiatValue(data);

	return { profiles, transfers };
};

export default getCoinbaseTotalFiatTransferred;
