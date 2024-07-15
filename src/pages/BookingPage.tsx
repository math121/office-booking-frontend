import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useRouterState } from "@tanstack/react-router";
import { PostBooking } from "../utils/types";
import { useEffect } from "react";
import loginData from "../utils/login.json";
import { useNavigate } from "@tanstack/react-router";

const dateFormat = "YYYY-MM-DDTHH:mm:ss";

export const BookingPage = () => {
  const navigate = useNavigate();

  const office = useRouterState({
    select: (s) => s.location.state.bookingState?.office,
  });

  const userId = useRouterState({
    select: (s) => s.location.state.userState?.id,
  });

  const { control, handleSubmit } = useForm<PostBooking>();

  const submitBooking: SubmitHandler<PostBooking> = (data) => {
    const startDate = dayjs(data.startDate).format(dateFormat);
    const endDate = dayjs(data.endDate).format(dateFormat);

    const postData: PostBooking = {
      startDate: startDate,
      endDate: endDate,
      officeId: office?.id,
      userId: userId,
    };

    fetch("http://localhost:8080/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then(console.log);
  };

  useEffect(() => {
    if (loginData.loggedIn == false) {
      navigate({ to: "/login" });
    }
  }, []);

  return (
    <>
      <h1>{office?.officeName}</h1>
      <p>{office?.description}</p>

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
