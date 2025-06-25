import styled from '@emotion/styled';
import { Button } from '../widgets';

const ToolbarButton = styled(Button)({
  '&.buttonV2': {
    fontSize: 14,
    fontWeight: 600
  },
  '&.buttonV2.button-text': {
    borderRadius: 4,
    border: '1px solid var(--border-color, #E5E7EB)',
    color: 'var(--text-color, #1F2937)'
  }
});

export default ToolbarButton;
