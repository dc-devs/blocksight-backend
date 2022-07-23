interface IProps {
	pluralName: string;
}

const getSingularNameFromString = ({ pluralName }: IProps) => {
	return pluralName.replace(/s$/g, '');
};

export default getSingularNameFromString;
