import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import loginData from "../utils/login.json";
import { useQuery } from "@tanstack/react-query";
import { useRouterState } from "@tanstack/react-router";
import { BookingDetails } from "../utils/types";

export const UserPage = () => {
  const navigate = useNavigate();

  const userId = useRouterState({
    select: (s) => s.location.state.userState?.id,
  });

  useEffect(() => {
    if (loginData.loggedIn == false) {
      navigate({ to: "/login" });
    }
  }, []);

  const [timePeriod, setTimePeriod] = useState("future");

  function getBookings() {
    return fetch(`http://localhost:8080/api/bookings/${timePeriod}/${1}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      });
  }

  const { data, isLoading } = useQuery({
    queryKey: ["myBookings", timePeriod],
    queryFn: getBookings,
  });

  console.log(userId);
  console.log(data);

  return (
    <>
      <h1>My Page</h1>
      <button onClick={() => setTimePeriod("past")}>Past Bookings</button>
      <button onClick={() => setTimePeriod("future")}>Future Bookings</button>
      {!isLoading &&
        data.length != 0 &&
        data.map((value: BookingDetails) => (
          <div key={value.id} className="flex gap-10">
            <p>{value.office.officeName}</p>
            <p>{value.office.location}</p>
            <p>{value.startDate}</p>
            <p>{value.endDate}</p>
          </div>
        ))}
    </>
  );
};
