/* eslint-disable n/no-callback-literal */
export const debounce = (callback: (searchString: string) => void, waitTime: number) => {
	let timeoutId: any = null;

	return (...args: any) => {
		clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			const searchString: string = args[0];
			callback(searchString);
		}, waitTime);
	};
};
