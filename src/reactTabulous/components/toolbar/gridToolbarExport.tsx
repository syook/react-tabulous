import { Icon, Menu, MenuItem, Popup } from '../widgets';
import ToolbarButton from './toolbarButton';
import { useGridExport } from '../../hooks/useGridExport';

export const GridToolbarExport: React.FC = () => {
  const { handleExport, filteredAndSortedData, columns, searchText, customExport, conditionalFormatting } =
    useGridExport();

  const handleDataExport = (type: string) => {
    handleExport(type);
  };

  return (
    <>
      {customExport ? (
        <ToolbarButton
          variant="text"
          size="small"
          icon={<Icon name="download" size={14} />}
          onClick={() => customExport(filteredAndSortedData, searchText, columns, conditionalFormatting)}
        >
          Export
        </ToolbarButton>
      ) : (
        <Popup
          noPadding
          trigger={
            <ToolbarButton variant="text" size="small" icon={<Icon name="download" size={14} />}>
              Export
            </ToolbarButton>
          }
        >
          <Menu>
            <MenuItem
              label="Download as CSV"
              onClick={() => {
                handleDataExport('csv');
              }}
            />
            <MenuItem
              label="Download as Excel"
              onClick={() => {
                handleDataExport('xlsx');
              }}
            />
          </Menu>
        </Popup>
      )}
    </>
  );
};
