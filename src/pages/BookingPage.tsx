import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useRouterState } from "@tanstack/react-router";
import { PostBooking } from "../utils/types";

export const BookingPage = () => {
  const officeId = useRouterState({
    select: (s) => s.location.state.bookingState?.officeId,
  });

  const { control, handleSubmit } = useForm<PostBooking>();

  const submitBooking: SubmitHandler<PostBooking> = (data) => {
    const startDate = dayjs(data.startDate).format("YYYY-MM-DDTHH:mm:ss");
    const endDate = dayjs(data.endDate).format("YYYY-MM-DDTHH:mm:ss");

    const postData: PostBooking = {
      startDate: startDate,
      endDate: endDate,
      officeId: officeId,
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
      <h1>Office name</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam itaque
        quod neque blanditiis animi, perspiciatis placeat deleniti nulla
        asperiores molestiae, veritatis aliquam voluptates consectetur sed
        distinctio amet magni rem nam? Nihil rem provident iure. Commodi
        molestiae dicta harum assumenda esse?
      </p>

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
