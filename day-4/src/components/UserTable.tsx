import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { memo, useEffect } from "react";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useDeleteUserMutation, useGetUsersQuery } from "./RtkQuery";
import Loader from "./Loader";
import { IUser } from "../types";
import { toast } from "react-toastify";
import ButtonComponent from "./Button";
import UserDialog from "./UserDialog";
import { showError } from "../helpers";

const UserTable = memo(() => {
  const {
    isLoading,
    data: usersData,
    error,
    isError,
  } = useGetUsersQuery(undefined);

  const [
    deleteUser,
    {
      isLoading: isLoadingDelete,
      isError: isErrorDelete,
      error: errorDelete,
      isSuccess: isSuccessDelete,
    },
  ] = useDeleteUserMutation();

  useEffect(() => {
    showError(isError, error);
    showError(isErrorDelete, errorDelete);
    if (isSuccessDelete) {
      toast.success("User deleted successfully!");
    }
  }, [error, errorDelete, isError, isErrorDelete, isSuccessDelete]);

  return (
    <>
      <Loader isOpen={isLoading || isLoadingDelete} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="!font-bold !text-lg">First Name</TableCell>
              <TableCell className="!font-bold !text-lg">Last Name</TableCell>
              <TableCell className="!font-bold !text-lg">
                Email Address
              </TableCell>
              <TableCell className="!font-bold !text-lg" align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData?.map((user: IUser) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell className="!font-medium !text-base">
                  {user.firstName}
                </TableCell>
                <TableCell className="!font-medium !text-base">
                  {user.lastName}
                </TableCell>
                <TableCell className="!font-medium !text-base">
                  {user.email}
                </TableCell>
                <TableCell className="!font-medium !text-base !gap-3 !flex !justify-center">
                  <UserDialog editUserId={user.id} />
                  <ButtonComponent onClick={() => deleteUser(user.id)}>
                    Delete
                  </ButtonComponent>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
});

export default UserTable;
