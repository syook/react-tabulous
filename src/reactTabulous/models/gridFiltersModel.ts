import { OptionInterface } from '../helpers/select';

export interface FilterFieldProps {
  condition: string;
  column: string;
  type: 'string' | 'number' | 'date' | 'dateTime' | 'boolean' | 'singleSelect';
  operator: string;
  value: any;
  field?: string;
  options?: string[] | OptionInterface[];
}
