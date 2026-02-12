import type { CSSProperties } from 'react';
import { type GridConditionalFormattingRule } from '../models';
import { queryCondition } from '../hooks/useGridFilter'; // reuse filter logic for conditions
import { type GridColDef } from '../models';

/**
 * Computes the style for a cell based on matching conditional formatting rules.
 * Rules are checked in order (priority by array position); last match wins for overlapping styles.
 * Independent of filters/sorts.
 * Applies to the rule's field (column).
 */
export const getConditionalCellStyle = (
  row: any,
  column: GridColDef, // current column being rendered
  rowIndex: number,
  rules: GridConditionalFormattingRule[] = []
): CSSProperties => {
  const appliedStyle: CSSProperties = {};

  // Sort rules by priority (higher first, but since order matters, use array order)
  const sortedRules = [...rules].sort((a, b) => b.priority - a.priority);

  for (const rule of sortedRules) {
    // Determine if this rule applies to current column/cell (rely on field key).
    // Guard for special cells (e.g. checkbox/serial) without column prop.
    if (!column?.field || column.field !== rule.field) continue;

    // Evaluate condition using rule's field
    const columnDef = column; // since field matches
    const cellValue = getCellValueForRule(row, rule.field, columnDef);

    const type = columnDef?.type || 'string';
    const matches = queryCondition(cellValue, rule.operator, rule.value, type, rule.value2); // extend if needed

    if (matches) {
      // Apply style (merge, later overrides)
      if (rule.style.textColor) appliedStyle.color = rule.style.textColor;
      if (rule.style.backgroundColor) appliedStyle.backgroundColor = rule.style.backgroundColor;
    }
  }

  return appliedStyle;
};

/**
 * Helper to get value for rule evaluation (similar to cell value logic).
 */
const getCellValueForRule = (row: any, field: string, columnDef?: any): any => {
  if (columnDef?.valueGetter) {
    return columnDef.valueGetter(row, 0); // index not critical
  }
  return row?.[field];
};
