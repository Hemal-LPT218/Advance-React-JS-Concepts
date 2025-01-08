import React, { memo, useCallback, useState } from "react";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import enJson from "../locales/en.json";
import ButtonComponent from "./ButtonComponent";

interface IConfirmationDialogProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  onSuccess: () => void;
}

const ConfirmationDialog: React.FC<IConfirmationDialogProps> = ({
  children,
  title,
  description,
  onSuccess,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleAgree = useCallback(() => {
    onSuccess();

    setOpen(false);
  }, [onSuccess]);

  return (
    <React.Fragment>
      <ButtonComponent color="warning" onClick={handleClickOpen}>
        {children}
      </ButtonComponent>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
      >
        <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>

        <DialogContent>
          <DialogContentText id="confirmation-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <ButtonComponent variant="outlined" onClick={handleClose}>
            {enJson.disagree}
          </ButtonComponent>

          <ButtonComponent onClick={handleAgree}>
            {enJson.agree}
          </ButtonComponent>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default memo(ConfirmationDialog);
