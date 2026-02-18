import React from 'react';

import { useGridConditionalFormatting } from '../../hooks/useGridConditionalFormatting';
import { Popup } from '../widgets/popup';
import { Button } from '../widgets/button';
import styled from '@emotion/styled';
import ToolbarButton from './toolbarButton';

import { IconButton, Select, Icon, DotIndicator } from '../widgets';
import { filterOperators } from '../filter';
import { InputCategories } from '../filter/inputCategories';
import { type GridConditionalFormattingRule, type ConditionalFormattingOperator } from '../../models';

const StyledConditionalForm = styled.div({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 5,
  '.rulesBody': {
    maxHeight: 300,
    overflowY: 'auto',

    '.ruleRow': {
      display: 'flex',
      alignItems: 'center',
      padding: 8,
      gap: 12,
      borderBottom: '1px solid var(--grey-300, #e6e6e6)',
      '& .column': {
        width: 150
      },
      '& .operators': {
        width: 120
      },
      '& .inputCategories': {
        width: 190
      },
      '& .colorPicker': {
        display: 'flex',
        alignItems: 'center',
        gap: 4
      }
    }
  }
});

// Helper: update a rule when its `field` changes (resets operator/value based on column type)
const updateRuleField = (rules: GridConditionalFormattingRule[], ruleId: string, newField: string, columns: any[]) => {
  const col: any = columns.find((c: any) => c.field === newField) ?? { field: '', type: 'string' };
  const type = col.type ?? 'string';
  const ops = (filterOperators as any)[type] || filterOperators.string;

  return rules.map(r =>
    r.id === ruleId
      ? {
          ...r,
          field: newField,
          operator: ops[0] as ConditionalFormattingOperator,
          value: type === 'boolean' ? 'true' : '',
          value2: undefined
        }
      : r
  );
};

/**
 * Toolbar section for Conditional Formatting.
 * Full UI for custom rules (apply to, condition, style); priority by add order.
 * Rules evaluated/applied independently to cells.
 */
export const GridToolbarConditionalFormatting: React.FC = () => {
  const { conditionalFormatting, handleClearRules, handleSetRules, columns } = useGridConditionalFormatting();
  const [showPopup, setShowPopup] = React.useState(false);

  // Local state for rules (edits don't apply live; only on Apply button)
  const [localRules, setLocalRules] = React.useState<GridConditionalFormattingRule[]>([]);
  // Get type-aware operators for a field (reuses filter logic)
  const getOperatorsForField = React.useCallback(
    (field: string): string[] => {
      const col = columns.find((c: any) => c.field === field);
      const type = col?.type ?? 'string';
      return (filterOperators as any)[type] || filterOperators.string;
    },
    [columns]
  );

  // Get column type for InputCategories (reuses filter logic)
  const getColumnType = React.useCallback(
    (field: string) => {
      const col = columns.find((c: any) => c.field === field);
      return col?.type ?? 'string';
    },
    [columns]
  );

  // Get options if singleSelect
  const getColumnOptions = React.useCallback(
    (field: string) => {
      const col = columns.find((c: any) => c.field === field);
      return col?.options ?? [];
    },
    [columns]
  );

  // Sync local from main when popup opens (avoid live updates during edit)
  React.useEffect(() => {
    if (showPopup) {
      if (!conditionalFormatting || conditionalFormatting.length === 0) {
        const firstCol = columns[0] || { field: '', type: 'string' };
        const newRule: GridConditionalFormattingRule = {
          id: `rule-${Date.now()}`,
          field: firstCol.field,
          operator: (getOperatorsForField(firstCol.field)[0] || '>') as ConditionalFormattingOperator,
          value: firstCol.type === 'boolean' ? 'true' : '',
          style: { textColor: '#000000', backgroundColor: '#ffffff' },
          priority: 1
        };
        setLocalRules([newRule]);
      } else {
        setLocalRules([...conditionalFormatting]);
      }
    }
  }, [showPopup, conditionalFormatting, columns, getOperatorsForField]);

  // Add new blank editable rule row to local (defaults to first column; like filter add)
  const handleAddNewRule = () => {
    const firstCol = columns[0] || { field: '', type: 'string' };
    const newRule: GridConditionalFormattingRule = {
      id: `rule-${Date.now()}`,
      field: firstCol.field,
      operator: (getOperatorsForField(firstCol.field)[0] || '>') as ConditionalFormattingOperator,
      value: '',
      style: { textColor: '#000000', backgroundColor: '#ffffff' },
      priority: localRules.length + 1
    };
    setLocalRules(prev => [...prev, newRule]);
  };

  // Apply local edits to main state/callback
  const handleApplyRules = () => {
    handleSetRules(localRules);
    setShowPopup(false);
  };

  // Clear local and main
  const handleClearRulesLocal = () => {
    setLocalRules([]);
    handleClearRules();
  };

  return (
    <Popup
      open={showPopup}
      onClose={() => setShowPopup(false)}
      noPadding
      trigger={
        <ToolbarButton
          variant="text"
          size="small"
          icon={<Icon name="conditional-format" size={18} />}
          title="Conditional Formatting"
          onClick={() => setShowPopup(p => !p)}
        >
          Conditional Formatting
          {conditionalFormatting.length > 0 && <DotIndicator />}
        </ToolbarButton>
      }
    >
      {/* Rules list (all editable rows like filter; no separate add form; local state for edits) */}
      <StyledConditionalForm>
        <div className="rulesBody">
          {localRules.map(rule => (
            <div key={rule.id} className="ruleRow">
              {/* Remove icon button (exact like filter) */}
              <IconButton
                name="close"
                onClick={() => setLocalRules(prev => prev.filter(r => r.id !== rule.id))}
                type="transparent"
                size={16}
                disabled={localRules.length === 1} // require at least 1 rule (like filter)
              />

              {/* Column */}
              <Select
                value={rule.field}
                onChange={e => {
                  const newField = e.target.value;
                  setLocalRules(prev => updateRuleField(prev, rule.id, newField, columns));
                }}
                options={columns.map((col: any) => ({ label: col.headerName || col.field, value: col.field }))}
                className="column"
              />
              {/* Operator (dynamic based on column type, like filters) */}
              <Select
                value={rule.operator}
                onChange={e => {
                  const newOperator = e.target.value as ConditionalFormattingOperator;
                  setLocalRules(prev =>
                    prev.map(r =>
                      r.id === rule.id
                        ? {
                            ...r,
                            operator: newOperator,
                            value2: newOperator === 'is between' ? r.value2 || '' : undefined
                          }
                        : r
                    )
                  );
                }}
                options={getOperatorsForField(rule.field).map(op => ({ label: op, value: op }))}
                className="operators"
              />
              {/* Value: reuse filter's InputCategories for type-aware rendering (date/number/select etc.) */}
              {rule.operator === 'is between' || rule.operator === 'is not between' ? (
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  <InputCategories
                    type={getColumnType(rule.field)}
                    value={rule.value || ''}
                    rowIndex={0} // dummy
                    query={rule.operator}
                    options={getColumnOptions(rule.field)}
                    disabled={false}
                    onChange={(value: any) =>
                      setLocalRules(prev => prev.map(r => (r.id === rule.id ? { ...r, value } : r)))
                    }
                    className="inputCategories"
                  />
                  <span>and</span>
                  <InputCategories
                    type={getColumnType(rule.field)}
                    value={rule.value2 || ''}
                    rowIndex={0} // dummy
                    query={rule.operator}
                    options={getColumnOptions(rule.field)}
                    disabled={false}
                    onChange={(value2: any) =>
                      setLocalRules(prev => prev.map(r => (r.id === rule.id ? { ...r, value2 } : r)))
                    }
                    className="inputCategories"
                  />
                </div>
              ) : (
                <InputCategories
                  type={getColumnType(rule.field)}
                  value={rule.value || ''}
                  rowIndex={0} // dummy
                  query={rule.operator}
                  options={getColumnOptions(rule.field)}
                  disabled={['is empty', 'is not empty'].includes(rule.operator)}
                  onChange={(value: any) =>
                    setLocalRules(prev => prev.map(r => (r.id === rule.id ? { ...r, value } : r)))
                  }
                  className="inputCategories"
                />
              )}
              {/* Text color */}
              <div className="colorPicker">
                Text
                <input
                  type="color"
                  value={rule.style.textColor || '#000000'}
                  onChange={e =>
                    setLocalRules(prev =>
                      prev.map(r => (r.id === rule.id ? { ...r, style: { ...r.style, textColor: e.target.value } } : r))
                    )
                  }
                />
              </div>
              {/* Background color */}
              <div className="colorPicker">
                Bg
                <input
                  type="color"
                  value={rule.style.backgroundColor || '#ffffff'}
                  onChange={e =>
                    setLocalRules(prev =>
                      prev.map(r =>
                        r.id === rule.id ? { ...r, style: { ...r.style, backgroundColor: e.target.value } } : r
                      )
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </StyledConditionalForm>

      {/* Footer buttons like filter (Add Rule adds new editable row; Apply/Clear) */}
      <div
        style={{
          display: 'flex',
          padding: 8,
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--grey-300, #e6e6e6)'
        }}
      >
        <Button variant="text" size="small" icon={<Icon name="add" size={14} />} onClick={handleAddNewRule}>
          Add Rule
        </Button>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="text" size="small" onClick={handleClearRulesLocal}>
            Clear
          </Button>
          <Button variant="contained" size="small" onClick={handleApplyRules}>
            Apply
          </Button>
        </div>
      </div>
    </Popup>
  );
};
