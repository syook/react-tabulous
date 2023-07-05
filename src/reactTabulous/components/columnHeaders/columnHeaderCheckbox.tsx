import { Checkbox } from '../widgets';

type ColumnHeaderCheckboxProps = React.HTMLAttributes<HTMLDivElement> & {
	checked: boolean;
	onBulkSelect: () => void;
};

export const ColumnHeaderCheckbox: React.FC<ColumnHeaderCheckboxProps> = ({
	checked,
	onBulkSelect
}) => {
	return (
		<div role="columnheader" className="columnHeader" data-field="checkbox">
			<div className="columnHeaderContainer">
				<div className="columnHeaderTitleContainer">
					<div className="columnHeaderTitle">
						<Checkbox checked={checked} onChange={onBulkSelect} />
					</div>
				</div>
			</div>
			<div className="columnHeaderActionResize" />
		</div>
	);
};
