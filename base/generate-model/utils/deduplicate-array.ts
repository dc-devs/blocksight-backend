const deduplicateArray = (array: any[]) => {
	return [...new Set(array)];
};

export default deduplicateArray;
