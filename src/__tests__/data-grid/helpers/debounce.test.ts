import { debounce } from '../../../data-grid/helpers/debounce';

// Tell Jest to mock all timeout functions
jest.useFakeTimers();

describe('debounce', () => {
	test('should debounce', () => {
		const callback = jest.fn();
		const debounced = debounce(callback, 1000);
		debounced();

		expect(callback).toHaveBeenCalledTimes(0);

		// Fast-forward time
		jest.runAllTimers();
		expect(callback).toHaveBeenCalledTimes(1);
	});
});
