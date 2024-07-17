import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useRouterState } from "@tanstack/react-router";
import { PostBooking } from "../utils/types";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

const dateFormat = "YYYY-MM-DDTHH:mm:ss";

export const BookingPage = () => {
  const navigate = useNavigate();

  const office = useRouterState({
    select: (s) => s.location.state.bookingState?.office,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PostBooking>();

  const submitBooking: SubmitHandler<PostBooking> = (data) => {
    const startDate = dayjs(data.startDate).format(dateFormat);
    const endDate = dayjs(data.endDate).format(dateFormat);

    const postData: PostBooking = {
      startDate: startDate,
      endDate: endDate,
      officeId: office?.id,
      userId: Number(localStorage.getItem("userId")),
    };

    fetch("http://localhost:8080/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((response) => {
      console.log(response);
      navigate({ to: "/myPage" });
    });
  };

  useEffect(() => {
    if (localStorage.getItem("loggedIn") == "false") {
      navigate({ to: "/login" });
    }
  }, []);

  console.log(errors);

  return (
    <div className="p-8 md:flex gap-20">
      <div>
        <h1>{office?.officeName}</h1>
        <p>{office?.description}</p>
        <img src={office?.image} alt="office pic" width={350} />
      </div>
      <form
        onSubmit={handleSubmit(submitBooking)}
        className="flex flex-col gap-4 justify-end w-3/5"
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            control={control}
            name="startDate"
            render={({ field }) => (
              <DateTimePicker
                ampm={false}
                disablePast={true}
                label="Start date"
                format="DD/MM/YYYY hh:mm"
                onChange={(startDate) => field.onChange(startDate)}
              />
            )}
          />
          <Controller
            control={control}
            name="endDate"
            render={({ field }) => (
              <DateTimePicker
                ampm={false}
                disablePast={true}
                label="End date"
                format="DD/MM/YYYY hh:mm"
                onChange={(endDate) => field.onChange(endDate)}
              />
            )}
          />
        </LocalizationProvider>

        <input className="h-8" type="submit" value="Book now" />
      </form>
    </div>
  );
};
