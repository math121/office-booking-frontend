import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { BookingDetails } from "../utils/types";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DateEdit } from "../utils/types";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const dateFormat = "YYYY-MM-DDTHH:mm:ss";

export const EditBooking = ({
  bookingDetails,
  trackChange,
  setTrackChange,
}: {
  bookingDetails: BookingDetails;
  trackChange: number;
  setTrackChange: (num: number) => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { control, handleSubmit } = useForm<DateEdit>();

  const saveBooking: SubmitHandler<DateEdit> = (data) => {
    const startDate = dayjs(data.startDate).format(dateFormat);
    const endDate = dayjs(data.endDate).format(dateFormat);

    const editData: DateEdit = {
      startDate: startDate,
      endDate: endDate,
    };

    fetch(`http://localhost:8080/api/bookings/${bookingDetails.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editData),
    }).then((response) => {
      console.log(response);
      setTrackChange(trackChange + 1);
      setOpen(false);
    });
  };

  return (
    <div>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit booking
          </Typography>

          <form
            onSubmit={handleSubmit(saveBooking)}
            className="flex flex-col gap-4"
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <DateTimePicker
                    label="Start date"
                    format="DD/MM/YYYY hh:mm"
                    ampm={false}
                    disablePast={true}
                    disabled={dayjs(bookingDetails.startDate) < dayjs()}
                    defaultValue={dayjs(bookingDetails.startDate)}
                    onChange={(startDate) => field.onChange(startDate)}
                  />
                )}
              />
              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <DateTimePicker
                    label="End date"
                    format="DD/MM/YYYY hh:mm"
                    ampm={false}
                    disablePast={true}
                    defaultValue={dayjs(bookingDetails.endDate)}
                    onChange={(endDate) => field.onChange(endDate)}
                  />
                )}
              />
            </LocalizationProvider>
            <Button type="submit">Save</Button>
          </form>

          <Button fullWidth={true} onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
