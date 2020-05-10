export const updatedObj = (oldObject, updatedValues) => {
	return {
		...oldObject,
		...updatedValues
	}
};