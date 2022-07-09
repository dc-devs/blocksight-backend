interface IScamTokenAddresses {
	[key: string]: boolean;
}

interface IScamTokens {
	[key: string]: IScamTokenAddresses;
}

export default IScamTokens;
