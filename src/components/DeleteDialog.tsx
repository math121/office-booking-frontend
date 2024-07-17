import { Button, Modal, Typography, Box } from "@mui/material";
import { useState } from "react";
import { Delete } from "@mui/icons-material";
import { Office } from "../utils/types";

const style = {
  borderRadius: "16px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
};

export const DeleteDialog = ({
  deleteBooking,
  office,
}: {
  deleteBooking: () => void;
  office: Office;
}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        color="error"
        startIcon={<Delete />}
        onClick={() => {
          setShow(true);
        }}
      >
        Delete
      </Button>
      <Modal open={show} onClose={() => setShow(false)}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this booking?
          </Typography>
          <p>
            <strong>Office Name: </strong>
            {office.officeName}
          </p>
          <p className="pb-3">
            <strong>Location: </strong> {office.location}
          </p>

          <div className="flex gap-28">
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                deleteBooking();
                setShow(false);
              }}
              sx={{ width: 1 }}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              onClick={() => setShow(false)}
              style={{ backgroundColor: "#1E1B1A" }}
              sx={{ width: 1 }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};
