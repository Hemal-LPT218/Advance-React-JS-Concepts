import React, { memo, useCallback, useState } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import DialogContentText from "@mui/material/DialogContentText";
import { ButtonPropsColorOverrides } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { OverridableStringUnion } from "@mui/types";
import Dialog from "@mui/material/Dialog";
import enJson from "../locales/en.json";
import ButtonComponent from "./ButtonComponent";

interface IConfirmationDialogProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  onSuccess: () => void;
  isDelete?: boolean;
  tooltipTitle?: string;
  buttonColor?:
    | OverridableStringUnion<
        | "warning"
        | "inherit"
        | "primary"
        | "secondary"
        | "success"
        | "error"
        | "info",
        ButtonPropsColorOverrides
      >
    | undefined;
}

const ConfirmationDialog: React.FC<IConfirmationDialogProps> = ({
  children,
  title,
  description,
  onSuccess,
  isDelete = true,
  tooltipTitle = enJson.delete,
  buttonColor = "warning",
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
      <ButtonComponent
        tooltipTitle={tooltipTitle}
        variant="text"
        color={buttonColor}
        onClick={handleClickOpen}
      >
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
          <ButtonComponent
            tooltipTitle={enJson.disagree}
            variant="outlined"
            onClick={handleClose}
          >
            <ThumbDownAltIcon />
          </ButtonComponent>

          <ButtonComponent
            tooltipTitle={enJson.agree}
            color={isDelete ? buttonColor : "primary"}
            onClick={handleAgree}
          >
            <ThumbUpAltIcon />
          </ButtonComponent>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default memo(ConfirmationDialog);
