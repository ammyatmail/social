import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import { TableCellProps } from "@material-ui/core/TableCell";
import { TableHeadProps } from "@material-ui/core/TableHead";
import { TableSortLabelProps } from "@material-ui/core/TableSortLabel";
import * as React from "react";

export interface SortableTableHeader {
  key: string;
  label?: React.ReactNode;
  sortable?: boolean;
  props?: TableCellProps;
}

interface Props {
  order: TableSortLabelProps["direction"];
  orderBy?: string;
  columnData: SortableTableHeader[];
  disableSorting?: boolean;
  tableHeadProps?: TableHeadProps;

  onRequestSort(e: React.MouseEvent<HTMLElement>, property: string): void;
}

export const SortableTableHead: React.FC<Props> = ({
  order,
  orderBy,
  columnData,
  disableSorting,
  tableHeadProps,
  onRequestSort,
}) => (
  <TableHead {...tableHeadProps}>
    <TableRow>
      {columnData.map(({ key, label, props, sortable = true }, i) => (
        <TableCell
          key={key}
          sortDirection={orderBy === key ? order : false}
          padding="normal"
          size="small"
          {...props}
        >
          {disableSorting || !sortable ? (
            label
          ) : (
            <TableSortLabel
              active={orderBy === key}
              direction={order}
              onClick={(e) => onRequestSort(e, key)}
            >
              {label}
            </TableSortLabel>
          )}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);
