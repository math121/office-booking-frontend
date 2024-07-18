import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

export const toastError = (text: string) => {
  return toast.error(text, {
    position: "top-center",
    autoClose: 4000,
  });
};

export const toastSuccess = (text: string) => {
  return toast.success(text, {
    position: "top-center",
    autoClose: 4000,
  });
};
