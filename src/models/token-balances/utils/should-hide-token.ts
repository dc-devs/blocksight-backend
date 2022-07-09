interface IProps {
	balance: string;
	price: number;
}

// TODO: centralize value for balance use same value
const shouldHideToken = ({ balance, price }: IProps) => {
	console.log(balance, price);
	return balance === '0.0000' || price === 0;
};

export default shouldHideToken;
