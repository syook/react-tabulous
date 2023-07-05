import { renderHook } from '@testing-library/react';
import { useDragHandler } from '../../../data-grid/hooks/useDragHandler';

describe('useDragHandler', () => {
	test('should return default values', () => {
		renderHook(useDragHandler);
	});
});
