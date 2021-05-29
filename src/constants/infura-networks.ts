interface Networks {
	'1': string;
	MAINNET: string;
	[key: string]: string;
}

const networks = {
	'1': 'homestead',
	MAINNET: 'homestead',
} as Networks;

export default networks;
