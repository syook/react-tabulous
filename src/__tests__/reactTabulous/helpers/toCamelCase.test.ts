import { toCamelCase } from '../../../reactTabulous/helpers/toCamelCase';

describe('toCamelCase', () => {
	test('should convert snake case to camelCase', () => {
		expect(toCamelCase('snake case')).toBe('snakeCase');
	});

	test('should convert snake_case to camelCase', () => {
		expect(toCamelCase('')).toBe('');
	});

	test('should convert hello to camelCase', () => {
		expect(toCamelCase('hello')).toBe('hello');
	});
});
