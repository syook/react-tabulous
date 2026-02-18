import { useCallback } from 'react';
import { useGridRootProps } from './useGridRootProps';
import { type GridConditionalFormattingRule } from '../models';

/**
 * Hook to manage conditional formatting rules.
 * Similar to useGridFilter.
 * Rules stored in root state.
 */
export const useGridConditionalFormatting = () => {
  const {
    rootState: { conditionalFormatting, onConditionalFormattingChange, columns },
    updateState
  } = useGridRootProps();

  const handleAddRule = useCallback(
    (newRule: Omit<GridConditionalFormattingRule, 'id' | 'priority'>) => {
      const rule: GridConditionalFormattingRule = {
        ...newRule,
        id: `rule-${Date.now()}`,
        priority: (conditionalFormatting?.length || 0) + 1
      };
      const updated = [...(conditionalFormatting || []), rule];
      updateState({ conditionalFormatting: updated });
      onConditionalFormattingChange?.(updated);
    },
    [conditionalFormatting, updateState, onConditionalFormattingChange]
  );

  const handleRemoveRule = useCallback(
    (ruleId: string) => {
      const updated = (conditionalFormatting || []).filter(r => r.id !== ruleId);
      // Reorder priorities
      updated.forEach((rule, idx) => {
        rule.priority = idx + 1;
      });
      updateState({ conditionalFormatting: updated });
      onConditionalFormattingChange?.(updated);
    },
    [conditionalFormatting, updateState, onConditionalFormattingChange]
  );

  const handleUpdateRule = useCallback(
    (updatedRule: GridConditionalFormattingRule) => {
      const updated = (conditionalFormatting || []).map(r => (r.id === updatedRule.id ? updatedRule : r));
      updateState({ conditionalFormatting: updated });
      onConditionalFormattingChange?.(updated);
    },
    [conditionalFormatting, updateState, onConditionalFormattingChange]
  );

  const handleClearRules = useCallback(() => {
    const updated: GridConditionalFormattingRule[] = [];
    updateState({ conditionalFormatting: updated });
    onConditionalFormattingChange?.(updated);
  }, [updateState, onConditionalFormattingChange]);

  // Bulk set rules (for Apply from UI)
  const handleSetRules = useCallback(
    (rules: GridConditionalFormattingRule[]) => {
      updateState({ conditionalFormatting: rules });
      onConditionalFormattingChange?.(rules);
    },
    [updateState, onConditionalFormattingChange]
  );

  return {
    conditionalFormatting: conditionalFormatting || [],
    handleAddRule,
    handleRemoveRule,
    handleUpdateRule,
    handleClearRules,
    handleSetRules,
    columns // for UI selection
  };
};
