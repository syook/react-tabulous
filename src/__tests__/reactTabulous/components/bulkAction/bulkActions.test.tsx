import user from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { BulkActions } from '../../../../reactTabulous/components/bulkAction';

describe('BulkActions', () => {
  test('should render correctly when bulkAction type is string', () => {
    render(<BulkActions selectedRows={[1, 2]} bulkActions={['delete', 'edit']} onBulkActionClick={() => {}} />);

    const [deleteButton, editButton] = screen.getAllByRole('button');
    expect(deleteButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
  });

  test('should render correctly when bulkAction type is HTMLButton', () => {
    const DeleteButton = () => <button>Delete</button>;
    render(
      <BulkActions
        selectedRows={[1, 2]}
        bulkActions={[<DeleteButton key={'deleteButton'} />]}
        onBulkActionClick={() => {}}
      />
    );

    const [deleteButton] = screen.getAllByRole('button');
    expect(deleteButton).toBeInTheDocument();
  });

  test('should render correctly when bulkAction button is clicked', async () => {
    user.setup();
    render(<BulkActions selectedRows={[1, 2]} bulkActions={['delete']} onBulkActionClick={() => {}} />);

    const deleteButton = screen.getByRole('button');
    await user.click(deleteButton);
  });
});
