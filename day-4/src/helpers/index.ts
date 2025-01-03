import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";

export const showError = (
  isError: boolean,
  error: FetchBaseQueryError | SerializedError | undefined
) => {
  if (isError && error && "message" in error) {
    toast.error(error.message || "An unexpected error occurred");
  } else if (isError) {
    toast.error("An unexpected error occurred");
  }
};
