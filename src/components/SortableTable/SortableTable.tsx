import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { TableProps } from "@material-ui/core/Table";
import { TableCellProps } from "@material-ui/core/TableCell";
import { TableHeadProps } from "@material-ui/core/TableHead";
import { TableRowProps } from "@material-ui/core/TableRow";
import { TableSortLabelProps } from "@material-ui/core/TableSortLabel";
import { DelayedLinearProgress } from "components/DelayedLinearProgress";
import { useLocalStorageSettings } from "../../hooks";
import * as React from "react";
import { useLocation } from "react-router";
import { EmptyView } from "../EmptyView";
import { SortableTableHead, SortableTableHeader } from "./components";
import { useStyles } from "./styles";

export interface SortableTableCell {
  key: string;
  display: React.ReactNode;
  sortValue?: string | number;
  props?: TableCellProps;
}

export interface SortableTableRow {
  key: string;
  cells: SortableTableCell[];
  props?: TableRowProps;
}

export interface TableSettings {
  rowsPerPage: number;
  order?: "asc" | "desc" | undefined;
  orderBy?: string;
}

interface Props {
  defaultSort?: {
    columnKey: string;
    order: TableSortLabelProps["direction"];
  };
  columns: SortableTableHeader[];
  rows: SortableTableRow[];
  loading?: boolean;
  tableProps?: TableProps;
  tableHeadProps?: TableHeadProps;
  emptyTableText?: string;
  disablePagination?: boolean;
  disableSorting?: boolean;

  emptyTableCreateAction?(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void;
}

export const SortableTable: React.FC<Props> = ({
  defaultSort,
  columns,
  rows,
  loading = false,
  tableProps,
  tableHeadProps,
  emptyTableText = "Nothing here yet",
  disablePagination,
  disableSorting,
  emptyTableCreateAction,
}) => {
  const classes = useStyles();
  const { pathname, hash } = useLocation();

  const storageKey = `${pathname}_${hash}_table_settings`.replace(/__/g, "_");

  const [tableSettings, setTableSettings] =
    useLocalStorageSettings<TableSettings>(storageKey, { rowsPerPage: 10 });

  let sortableColumn;

  if (tableSettings.orderBy) {
    sortableColumn = columns.find((c) => c.key === tableSettings.orderBy);
  } else if (defaultSort) {
    const { columnKey } = defaultSort;

    sortableColumn = columns.find((c) => c.key === columnKey);
  } else {
    sortableColumn = columns.find(
      (c) => c.sortable === undefined || c.sortable
    );
  }

  const [order, setOrder] = React.useState<TableSortLabelProps["direction"]>(
    tableSettings.order
      ? tableSettings.order
      : defaultSort
      ? defaultSort.order
      : "asc"
  );
  const [orderBy, setOrderBy] = React.useState(
    sortableColumn && sortableColumn.key
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(
    tableSettings.rowsPerPage
  );

  React.useEffect(() => {
    const maxPage = Math.ceil(rows.length / rowsPerPage);
    if (page > maxPage) {
      setPage(0);
    }
  }, [rows, rowsPerPage, page]);

  let rowCopy = rows;

  // Sorting
  if (orderBy && !disableSorting) {
    rowCopy = rowCopy.concat().sort(getSorting(order, orderBy));
  }

  if (!disablePagination) {
    // Paging
    rowCopy = rowCopy.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }

  return (
    <React.Fragment>
      <DelayedLinearProgress loading={loading} />

      {rows.length > 0 ? (
        <React.Fragment>
          <Table {...tableProps}>
            <SortableTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              columnData={columns}
              disableSorting={disableSorting}
              tableHeadProps={tableHeadProps}
            />

            <TableBody>
              {rowCopy.map((row) => (
                <TableRow hover tabIndex={-1} key={row.key} {...row.props}>
                  {row.cells.map(({ display, key: cellKey, props }) => (
                    <TableCell key={cellKey} {...props}>
                      {display}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>

            {!disablePagination && (
              <TableFooter>
                <TableRow>
                  <TablePagination
                    component="div"
                    count={rows.length}
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    classes={{
                      selectRoot: classes.selectRootResponsive,
                      actions: classes.actionsResponsive,
                    }}
                    nextIconButtonProps={{
                      classes: {
                        root: classes.btnRootResponsive,
                      },
                    }}
                    backIconButtonProps={{
                      classes: {
                        root: classes.btnRootResponsive,
                      },
                    }}
                  />
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </React.Fragment>
      ) : (
        !loading && (
          <EmptyView>
            {emptyTableText}

            <br />

            {emptyTableCreateAction && (
              <Button
                color="primary"
                size="small"
                onClick={emptyTableCreateAction}
              >
                Create one
              </Button>
            )}
          </EmptyView>
        )
      )}
    </React.Fragment>
  );

  function handleRequestSort(
    e: React.MouseEvent<HTMLElement>,
    newOrderBy: string
  ) {
    if (disableSorting) {
      return;
    }

    const newOrder =
      orderBy === newOrderBy && order === "desc" ? "asc" : "desc";

    setOrder(newOrder);
    setOrderBy(newOrderBy);
    setTableSettings((s) => ({ ...s, order: newOrder, orderBy: newOrderBy }));
  }

  function handleChangePage(
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) {
    if (disablePagination) {
      return;
    }

    setPage(newPage);
  }

  function handleChangeRowsPerPage({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setRowsPerPage(parseInt(value, 10));
    setPage(0);
    setTableSettings((s) => ({ ...s, rowsPerPage: parseInt(value, 10) }));
  }

  function getSorting(
    direction: TableSortLabelProps["direction"],
    key: string
  ) {
    const index = columns.findIndex((c) => key === c.key);

    return (a: SortableTableRow, b: SortableTableRow) => {
      const aCell = a.cells[index];
      const bCell = b.cells[index];

      if (!aCell && !bCell) {
        return 0;
      }

      if (!aCell) {
        return 1;
      }

      if (!bCell) {
        return -1;
      }

      const aVal = aCell.sortValue || aCell.display;
      const bVal = bCell.sortValue || bCell.display;

      const comparison =
        typeof aVal === "number" && typeof bVal === "number"
          ? aVal - bVal
          : String(aVal).localeCompare(String(bVal));

      if (direction === "desc") {
        return -comparison;
      }

      return comparison;
    };
  }
};
