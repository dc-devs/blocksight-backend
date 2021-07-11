const t = {
	block_signed_at: '2021-05-11T22:51:57Z',
	block_height: 12415921,
	tx_hash:
		'0xb7112c48ea960213c02bce2be2dfd3e0e20b070db14bd680555eca5a0287cf82',
	tx_offset: 80,
	successful: true,
	from_address: '0x4b7f04f7960db235cfb333721f9ee51a5929ab35',
	from_address_label: null,
	to_address: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
	to_address_label: 'Uniswap V2: Router 2',
	value: '1000000000000000000',
	value_quote: 4190.65771484375,
	gas_offered: 161236,
	gas_spent: 121062,
	gas_price: 249000000000,
	gas_quote: 126.3250216643291,
	gas_quote_rate: 4190.65771484375,
	log_events: [
		{
			block_signed_at: '2021-05-11T22:51:57Z',
			block_height: 12415921,
			tx_offset: 80,
			log_offset: 175,
			tx_hash:
				'0xb7112c48ea960213c02bce2be2dfd3e0e20b070db14bd680555eca5a0287cf82',
			_raw_log_topics_bytes: null,
			raw_log_topics: [
				'0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822',
				'0x0000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d',
				'0x0000000000000000000000004b7f04f7960db235cfb333721f9ee51a5929ab35',
			],
			sender_contract_decimals: 18,
			sender_name: 'Uniswap V2',
			sender_contract_ticker_symbol: 'UNI-V2',
			sender_address: '0xee9b50b74a132912cf55e7699ef3aa7ae2b00e0c',
			sender_address_label: null,
			sender_logo_url:
				'https://logos.covalenthq.com/tokens/0xee9b50b74a132912cf55e7699ef3aa7ae2b00e0c.png',
			raw_log_data:
				'0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000c848fee4289bfb740ca0000000000000000000000000000000000000000000000000000000000000000',
			decoded: {
				name: 'Swap',
				signature:
					'Swap(indexed address sender, uint256 amount0In, uint256 amount1In, uint256 amount0Out, uint256 amount1Out, indexed address to)',
				params: [
					{
						name: 'sender',
						type: 'address',
						indexed: true,
						decoded: true,
						value: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
					},
					{
						name: 'amount0In',
						type: 'uint256',
						indexed: false,
						decoded: true,
						value: '0',
					},
					{
						name: 'amount1In',
						type: 'uint256',
						indexed: false,
						decoded: true,
						value: '1000000000000000000',
					},
					{
						name: 'amount0Out',
						type: 'uint256',
						indexed: false,
						decoded: true,
						value: '59113739312316678619338',
					},
					{
						name: 'amount1Out',
						type: 'uint256',
						indexed: false,
						decoded: true,
						value: '0',
					},
					{
						name: 'to',
						type: 'address',
						indexed: true,
						decoded: true,
						value: '0x4b7f04f7960db235cfb333721f9ee51a5929ab35',
					},
				],
			},
		},
		{
			block_signed_at: '2021-05-11T22:51:57Z',
			block_height: 12415921,
			tx_offset: 80,
			log_offset: 174,
			tx_hash:
				'0xb7112c48ea960213c02bce2be2dfd3e0e20b070db14bd680555eca5a0287cf82',
			_raw_log_topics_bytes: null,
			raw_log_topics: [
				'0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1',
			],
			sender_contract_decimals: 18,
			sender_name: 'Uniswap V2',
			sender_contract_ticker_symbol: 'UNI-V2',
			sender_address: '0xee9b50b74a132912cf55e7699ef3aa7ae2b00e0c',
			sender_address_label: null,
			sender_logo_url:
				'https://logos.covalenthq.com/tokens/0xee9b50b74a132912cf55e7699ef3aa7ae2b00e0c.png',
			raw_log_data:
				'0x00000000000000000000000000000000000000000002dd9eda29b7f8f627887000000000000000000000000000000000000000000000000338c2ba5eef38417c',
			decoded: {
				name: 'Sync',
				signature: 'Sync(uint112 reserve0, uint112 reserve1)',
				params: [
					{
						name: 'reserve0',
						type: 'uint112',
						indexed: false,
						decoded: true,
						value: '3464424937805350273779824',
					},
					{
						name: 'reserve1',
						type: 'uint112',
						indexed: false,
						decoded: true,
						value: '59430268549637620092',
					},
				],
			},
		},
		{
			block_signed_at: '2021-05-11T22:51:57Z',
			block_height: 12415921,
			tx_offset: 80,
			log_offset: 173,
			tx_hash:
				'0xb7112c48ea960213c02bce2be2dfd3e0e20b070db14bd680555eca5a0287cf82',
			_raw_log_topics_bytes: null,
			raw_log_topics: [
				'0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
				'0x000000000000000000000000ee9b50b74a132912cf55e7699ef3aa7ae2b00e0c',
				'0x0000000000000000000000004b7f04f7960db235cfb333721f9ee51a5929ab35',
			],
			sender_contract_decimals: 18,
			sender_name: 'RevolutionPopuli ERC20 Token',
			sender_contract_ticker_symbol: 'RVP',
			sender_address: '0x17ef75aa22dd5f6c2763b8304ab24f40ee54d48a',
			sender_address_label: null,
			sender_logo_url:
				'https://logos.covalenthq.com/tokens/0x17ef75aa22dd5f6c2763b8304ab24f40ee54d48a.png',
			raw_log_data:
				'0x000000000000000000000000000000000000000000000c848fee4289bfb740ca',
			decoded: {
				name: 'Transfer',
				signature:
					'Transfer(indexed address from, indexed address to, uint256 value)',
				params: [
					{
						name: 'from',
						type: 'address',
						indexed: true,
						decoded: true,
						value: '0xee9b50b74a132912cf55e7699ef3aa7ae2b00e0c',
					},
					{
						name: 'to',
						type: 'address',
						indexed: true,
						decoded: true,
						value: '0x4b7f04f7960db235cfb333721f9ee51a5929ab35',
					},
					{
						name: 'value',
						type: 'uint256',
						indexed: false,
						decoded: true,
						value: '59113739312316678619338',
					},
				],
			},
		},
		{
			block_signed_at: '2021-05-11T22:51:57Z',
			block_height: 12415921,
			tx_offset: 80,
			log_offset: 172,
			tx_hash:
				'0xb7112c48ea960213c02bce2be2dfd3e0e20b070db14bd680555eca5a0287cf82',
			_raw_log_topics_bytes: null,
			raw_log_topics: [
				'0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
				'0x0000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d',
				'0x000000000000000000000000ee9b50b74a132912cf55e7699ef3aa7ae2b00e0c',
			],
			sender_contract_decimals: 18,
			sender_name: 'Wrapped Ether',
			sender_contract_ticker_symbol: 'WETH',
			sender_address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
			sender_address_label: null,
			sender_logo_url:
				'https://logos.covalenthq.com/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
			raw_log_data:
				'0x0000000000000000000000000000000000000000000000000de0b6b3a7640000',
			decoded: {
				name: 'Transfer',
				signature:
					'Transfer(indexed address from, indexed address to, uint256 value)',
				params: [
					{
						name: 'from',
						type: 'address',
						indexed: true,
						decoded: true,
						value: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
					},
					{
						name: 'to',
						type: 'address',
						indexed: true,
						decoded: true,
						value: '0xee9b50b74a132912cf55e7699ef3aa7ae2b00e0c',
					},
					{
						name: 'value',
						type: 'uint256',
						indexed: false,
						decoded: true,
						value: '1000000000000000000',
					},
				],
			},
		},
		{
			block_signed_at: '2021-05-11T22:51:57Z',
			block_height: 12415921,
			tx_offset: 80,
			log_offset: 171,
			tx_hash:
				'0xb7112c48ea960213c02bce2be2dfd3e0e20b070db14bd680555eca5a0287cf82',
			_raw_log_topics_bytes: null,
			raw_log_topics: [
				'0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c',
				'0x0000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d',
			],
			sender_contract_decimals: 18,
			sender_name: 'Wrapped Ether',
			sender_contract_ticker_symbol: 'WETH',
			sender_address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
			sender_address_label: null,
			sender_logo_url:
				'https://logos.covalenthq.com/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
			raw_log_data:
				'0x0000000000000000000000000000000000000000000000000de0b6b3a7640000',
			decoded: {
				name: 'Deposit',
				signature: 'Deposit(indexed address dst, uint256 wad)',
				params: [
					{
						name: 'dst',
						type: 'address',
						indexed: true,
						decoded: true,
						value: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
					},
					{
						name: 'wad',
						type: 'uint256',
						indexed: false,
						decoded: true,
						value: '1000000000000000000',
					},
				],
			},
		},
	],
};
