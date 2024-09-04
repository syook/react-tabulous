export type GridActionsCellItemProps = {
  label: string;
  icon?: React.ReactElement;
} & ({ showInMenu?: false; icon: React.ReactElement } | { showInMenu: true });
