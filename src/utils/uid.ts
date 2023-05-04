const uid = () => {
	const timestamp = Date.now().toString(36);
	const randomChars = Math.random().toString(36).substring(2, 7);
	const uniqueId = timestamp + randomChars;
	return uniqueId;
};

export { uid };
