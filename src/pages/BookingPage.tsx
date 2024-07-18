import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useRouterState } from "@tanstack/react-router";
import { DateEdit, PostBooking } from "../utils/types";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@mui/material";
import { toastSuccess } from "../components/ToastFeedback";

const dateFormat = "YYYY-MM-DDTHH:mm:ss";

export const BookingPage = () => {
  const navigate = useNavigate();

  const office = useRouterState({
    select: (s) => s.location.state.bookingState?.office,
  });

  const [startDate, setStartDate] = useState<Dayjs | null>();
  const [bookedDates, setBookedDates] = useState<DateEdit[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PostBooking>();

  const submitBooking: SubmitHandler<PostBooking> = (data) => {
    const startDate = dayjs(data.startDate).format(dateFormat);
    const endDate = dayjs(data.endDate).format(dateFormat);
    console.log(dayjs(data.endDate).isValid());

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
      setTimeout(() => {
        toastSuccess("Booking has been made");
      }, 1);
    });
  };

  const getBookedDatesForOffice = () => {
    fetch(`http://localhost:8080/api/bookings/bookedDates/${office?.id}`)
      .then((response) => response.json())
      .then((data) => setBookedDates(data));
  };

  useEffect(() => {
    if (localStorage.getItem("loggedIn") == "false") {
      navigate({ to: "/login" });
    } else {
      getBookedDatesForOffice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bookedDatesCheck = (val: string) => {
    for (let i = 0; i < bookedDates.length; i++) {
      if (
        dayjs(val).isAfter(dayjs(bookedDates[i].startDate)) &&
        dayjs(val).isBefore(dayjs(bookedDates[i].endDate))
      ) {
        return "Office is already booked within this time period";
      }
    }
  };

  return (
    <div className="p-8 md:flex gap-28">
      <div className="w-5/12">
        <h1>{office?.officeName}</h1>
        <p>{office?.description}</p>
        <img
          src={office?.image || "src/assets/placeholder.png"}
          alt="office pic"
          className="object-contain h-64 w-full pt-3"
        />
      </div>
      <form
        onSubmit={handleSubmit(submitBooking)}
        className="flex flex-col justify-center gap-3"
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            control={control}
            name="startDate"
            rules={{
              required: "Required field",
              validate: {
                validDateCheck: (val) => dayjs(val).isValid() || "Invalid date",
                pastDateCheck: (val) =>
                  !dayjs(val).isBefore(dayjs()) ||
                  "Cannot choose past dates and time",
              },
            }}
            render={({ field }) => (
              <DateTimePicker
                disablePast={true}
                label="Start date"
                ampm={false}
                format="DD/MM/YYYY hh:mm A"
                onChange={(startDate) => {
                  field.onChange(startDate);
                  setStartDate(startDate);
                }}
              />
            )}
          />
          <span className="text-red-600">
            {errors.startDate && errors.startDate.message}
          </span>
          <Controller
            control={control}
            name="endDate"
            rules={{
              required: "Required field",
              validate: {
                validDateCheck: (val) => dayjs(val).isValid() || "Invalid date",
                pastDateCheck: (val) =>
                  !dayjs(val).isBefore(dayjs()) ||
                  "Cannot choose past dates and time",
                dateAfterStartDate: (val) =>
                  (startDate != null && dayjs(val).isAfter(dayjs(startDate))) ||
                  "End date must be after start date",
                validateBookedDates: (val) => bookedDatesCheck(val),
              },
            }}
            render={({ field }) => (
              <DateTimePicker
                disablePast={true}
                label="End date"
                ampm={false}
                format="DD/MM/YYYY hh:mm A"
                onChange={(endDate) => {
                  field.onChange(endDate);
                }}
              />
            )}
          />
          <span className="text-red-600">
            {errors.endDate && errors.endDate.message}
          </span>
        </LocalizationProvider>

        <Button
          disabled={Object.keys(errors).length != 0}
          type="submit"
          variant="contained"
          sx={{
            "&.Mui-disabled": {
              backgroundColor: "gray",
              color: "#C0C0C0",
            },
            backgroundColor: "black",
            "&:hover": {
              backgroundColor: "#404040",
            },
          }}
        >
          Book now
        </Button>
      </form>
    </div>
  );
};
