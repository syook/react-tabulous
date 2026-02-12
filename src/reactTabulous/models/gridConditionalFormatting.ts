export type ConditionalFormattingOperator = string; // Broad to match all from filterOperators (e.g. '≤', '≥', dates); specific strings for type safety where needed

export interface GridConditionalFormattingRule {
  /**
   * Unique ID for the rule.
   */
  id: string;
  /**
   * The field (column) to evaluate condition and apply style to.
   * (Relies on this key/value; no separate columns array needed.)
   */
  field: string;
  /**
   * Operator for the condition (reuses filter operators).
   */
  operator: ConditionalFormattingOperator;
  /**
   * Value for condition (e.g. threshold, text).
   */
  value?: any;
  /**
   * Second value for operators like 'between'.
   */
  value2?: any;
  /**
   * Styles to apply if condition matches.
   */
  style: {
    textColor?: string;
    backgroundColor?: string;
  };
  /**
   * Higher number = higher priority (last in array wins on ties).
   * Managed by rule order in UI.
   */
  priority: number;
}

export interface GridConditionalFormattingProps {
  /**
   * Array of conditional formatting rules.
   * Rules are evaluated in order for each cell/row.
   */
  conditionalFormatting?: GridConditionalFormattingRule[];
  /**
   * Callback when rules change (e.g. add/edit/delete).
   */
  onConditionalFormattingChange?: (rules: GridConditionalFormattingRule[]) => void;
}
