export const randomInt = (low: number = 0, high: number = 10): number => {
	return Math.round(low + Math.random() * (high - low));
};

export const randomString = (
	length: number = randomInt(1, 20),
	possible: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
) => {
	var text = '';

	for (var i = 0; i < length; i++) {
		text += possible.charAt(randomInt(0, possible.length));
	}

	return text;
};

export const mockIPAddressV4 = (): string => {
	return (
		randomInt(1, 255) +
		'.' +
		randomInt(1, 255) +
		'.' +
		randomInt(1, 255) +
		'.' +
		randomInt(1, 255)
	);
};

export const randomBool = (chance = 0.5) => {
	return Math.random() > chance;
};

export const randomFromArray = <T>(array: T[]): T => {
	return array[randomInt(0, array.length - 1)];
};
