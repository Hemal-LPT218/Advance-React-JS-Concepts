import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "./Button";
import { memo, useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  useAddUserMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
} from "./RtkQuery";
import { toast } from "react-toastify";
import { showError } from "../helpers";

interface IUserDialogProps {
  editUserId?: string;
}

const initialFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  id: "",
};

const UserDialog: React.FC<IUserDialogProps> = memo(
  ({ editUserId }) => {
    const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState(initialFormValues);

    const [addUser, { isLoading, isSuccess, error, isError }] =
      useAddUserMutation();

    const [
      updateUser,
      {
        isLoading: isLoadingEdit,
        isSuccess: isSuccessEdit,
        error: errorEdit,
        isError: isErrorEdit,
      },
    ] = useUpdateUserMutation();

    const { data: userData, refetch } = useGetUserByIdQuery(editUserId!, {
      skip: !editUserId || !open,
    });

    const handleClickOpen = useCallback(() => {
      setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
      setOpen(false);
    }, []);

    useEffect(() => {
      if (!open) {
        setFormValues(initialFormValues);
      }
      if (editUserId && open) {
        refetch();
      }
    }, [editUserId, open, refetch]);

    useEffect(() => {
      if (isSuccess) {
        handleClose();
        toast.success("User saved successfully!");
      }
      showError(isError, error);
    }, [error, handleClose, isError, isSuccess]);

    useEffect(() => {
      if (isSuccessEdit) {
        handleClose();
        toast.success("User updated successfully!");
      }
      showError(isErrorEdit, errorEdit);
    }, [errorEdit, handleClose, isErrorEdit, isSuccessEdit]);

    useEffect(() => {
      if (userData && open) {
        setFormValues(userData);
      }
    }, [open, userData]);

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      },
      []
    );

    const handleSubmit = useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (editUserId) {
          updateUser(formValues);
        } else {
          addUser({
            ...formValues,
            id: uuidv4(),
          });
        }
      },
      [editUserId, updateUser, formValues, addUser]
    );

    return (
      <>
        <Button onClick={handleClickOpen}>
          {editUserId ? "Edit" : "Add User"}
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: handleSubmit,
          }}
        >
          <DialogTitle className="!font-bold">
            {editUserId ? "Edit User" : "Add User"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="firstName"
              name="firstName"
              label="First Name"
              type="text"
              fullWidth
              variant="standard"
              value={formValues.firstName}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="lastName"
              name="lastName"
              label="Last Name"
              type="text"
              fullWidth
              variant="standard"
              value={formValues.lastName}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              value={formValues.email}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              type="button"
              disabled={isLoading || isLoadingEdit}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || isLoadingEdit}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
);

export default UserDialog;
