import { ColumnAlignment } from '../models/columnDef/columnAlign';

export const densityMapping = {
  compact: 36,
  standard: 44,
  comfortable: 52
};

export const iconDensityMapping = {
  compact: 18,
  standard: 20,
  comfortable: 22
};

export const alignMapping: Record<ColumnAlignment, string> = {
  left: 'row',
  center: 'center',
  right: 'row-reverse'
};
