const flattenArrayOfArrays = (array: any[][]) => {
	return [].concat.apply([], array);
};

export default flattenArrayOfArrays;
