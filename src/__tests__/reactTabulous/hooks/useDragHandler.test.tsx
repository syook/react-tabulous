import { renderHook } from '@testing-library/react';
import { useDragHandler } from '../../../reactTabulous/hooks/useDragHandler';

describe('useDragHandler', () => {
  test('should return default values', () => {
    renderHook(useDragHandler);
  });
});
