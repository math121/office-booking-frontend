import { Button, Dialog, DialogTitle } from "@mui/material";
import { useState } from "react";
import { Delete } from "@mui/icons-material";

export const DeleteDialog = ({
  deleteBooking,
}: {
  deleteBooking: () => void;
}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        startIcon={<Delete />}
        onClick={() => {
          setShow(true);
        }}
      >
        Delete
      </Button>
      <Dialog open={show} onClose={() => setShow(false)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <Button
          onClick={() => {
            deleteBooking();
            setShow(false);
          }}
        >
          Confirm
        </Button>
        <Button onClick={() => setShow(false)}>Cancel</Button>
      </Dialog>
    </>
  );
};
