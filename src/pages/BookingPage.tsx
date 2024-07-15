import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useRouterState } from "@tanstack/react-router";
import { PostBooking } from "../utils/types";

export const BookingPage = () => {
  const office = useRouterState({
    select: (s) => s.location.state.bookingState?.office,
  });

  const { control, handleSubmit } = useForm<PostBooking>();

  const submitBooking: SubmitHandler<PostBooking> = (data) => {
    const startDate = dayjs(data.startDate).format("YYYY-MM-DDTHH:mm:ss");
    const endDate = dayjs(data.endDate).format("YYYY-MM-DDTHH:mm:ss");

    const postData: PostBooking = {
      startDate: startDate,
      endDate: endDate,
      officeId: office.id,
    };

    fetch("http://localhost:8080/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then(console.log);
  };

  return (
    <>
      <h1>{office.officeName}</h1>
      <p>{office.description}</p>

      <form onSubmit={handleSubmit(submitBooking)}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            control={control}
            name="startDate"
            render={({ field }) => (
              <DateTimePicker
                label="Start date"
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
                onChange={(endDate) => field.onChange(endDate)}
              />
            )}
          />
        </LocalizationProvider>

        <input type="submit" />
      </form>
    </>
  );
};
