import { useCallback, useMemo, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import ConfirmationDialog from "./ConfirmationDialog";
import ButtonComponent from "./ButtonComponent";
import enJson from "../locales/en.json";

export interface Column<T> {
  id: keyof T;
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: T[keyof T], row?: T) => JSX.Element;
}

interface ITableComponentProps<T> {
  columns: Column<T>[];
  rows: T[];
  showAction?: boolean;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  tableMaxHeight?: number;
  noTableData?: string;
  hideEdit?: boolean;
  deleteDescription?: string;
}

const TableComponent = <T,>({
  columns,
  rows,
  showAction,
  onEdit,
  onDelete,
  tableMaxHeight = 370,
  noTableData,
  hideEdit,
  deleteDescription,
}: ITableComponentProps<T>) => {
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = useCallback((_: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);

      setPage(0);
    },
    []
  );

  const tableHeader = useMemo(
    () =>
      columns.map((column) => (
        <TableCell
          key={column.id as string}
          align={column.align}
          style={{ minWidth: column.minWidth, fontWeight: 700 }}
        >
          {column.label}
        </TableCell>
      )),
    [columns]
  );

  const tableRow = useMemo(
    () =>
      rows.length ? (
        rows
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id as string} align={column.align}>
                      {column.format
                        ? column.format(value, row)
                        : (value as React.ReactNode)}
                    </TableCell>
                  );
                })}
                {showAction && (
                  <TableCell align="center" className="min-w-52">
                    {!hideEdit && (
                      <ButtonComponent
                        variant="contained"
                        onClick={() => onEdit?.(row)}
                        className="!mr-2"
                      >
                        {enJson.edit}
                      </ButtonComponent>
                    )}
                    <ConfirmationDialog
                      title={enJson.deleteConfirmation}
                      description={deleteDescription}
                      onSuccess={() => onDelete?.(row)}
                    >
                      {enJson.delete}
                    </ConfirmationDialog>
                  </TableCell>
                )}
              </TableRow>
            );
          })
      ) : (
        <TableRow hover role="checkbox" tabIndex={-1}>
          <TableCell
            align="center"
            colSpan={showAction ? columns.length + 1 : columns.length}
          >
            {noTableData}
          </TableCell>
        </TableRow>
      ),
    [
      columns,
      deleteDescription,
      hideEdit,
      noTableData,
      onDelete,
      onEdit,
      page,
      rows,
      rowsPerPage,
      showAction,
    ]
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: tableMaxHeight }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {tableHeader}
              {showAction && (
                <TableCell align="center" style={{ fontWeight: 700 }}>
                  {enJson.actions}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>{tableRow}</TableBody>
        </Table>
      </TableContainer>

      {!!rows.length && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default TableComponent;
