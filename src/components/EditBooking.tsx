import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { BookingDetails } from "../utils/types";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DateEdit } from "../utils/types";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { toastSuccess } from "./ToastFeedback";

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
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<DateEdit>();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    clearErrors("endDate");
  };

  const [startDate, setStartDate] = useState<Dayjs>(
    dayjs(bookingDetails.startDate)
  );

  const saveBooking: SubmitHandler<DateEdit> = (data) => {
    console.log(data);
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
      toastSuccess("Updated booking");
    });
  };

  return (
    <div>
      <Button
        variant="contained"
        color="error"
        onClick={handleOpen}
        style={{ backgroundColor: "#1E1B1A" }}
      >
        Edit
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="pb-10"
          >
            Edit booking - {bookingDetails.office.officeName}
          </Typography>

          <form
            onSubmit={handleSubmit(saveBooking)}
            className="flex flex-col gap-4"
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                control={control}
                defaultValue={bookingDetails.startDate}
                name="startDate"
                render={({ field }) => (
                  <DateTimePicker
                    label="Start date"
                    format="DD/MM/YYYY HH:mm"
                    disablePast={true}
                    ampm={false}
                    disabled={dayjs(bookingDetails.startDate) < dayjs()}
                    defaultValue={dayjs(bookingDetails.startDate)}
                    onChange={(startDate) => {
                      field.onChange(startDate);
                      setStartDate(dayjs(startDate));
                    }}
                  />
                )}
              />
              <Controller
                control={control}
                name="endDate"
                defaultValue={bookingDetails.endDate}
                rules={{
                  required: "Required field",
                  validate: {
                    validDateCheck: (val) =>
                      dayjs(val).isValid() || "Invalid date",
                    pastDateCheck: (val) =>
                      !dayjs(val).isBefore(dayjs()) ||
                      "Cannot choose past dates and time",
                    dateAfterStartDate: (val) =>
                      dayjs(val).isAfter(startDate) ||
                      "End date must be after start date",
                  },
                }}
                render={({ field }) => (
                  <DateTimePicker
                    label="End date"
                    ampm={false}
                    format="DD/MM/YYYY HH:mm"
                    disablePast={true}
                    defaultValue={dayjs(bookingDetails.endDate)}
                    onChange={(endDate) => field.onChange(endDate)}
                  />
                )}
              />
              <span className="text-red-600">
                {errors.endDate && errors.endDate.message}
              </span>
            </LocalizationProvider>
            <div className="flex gap-24">
              <Button
                type="submit"
                color="success"
                variant="contained"
                sx={{ width: 1 }}
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  setOpen(false);
                  clearErrors("endDate");
                }}
                variant="contained"
                style={{ backgroundColor: "#1E1B1A" }}
                sx={{ width: 1 }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
