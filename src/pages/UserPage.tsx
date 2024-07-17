import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BookingDetails } from "../utils/types";
import { ViewBookingCard } from "../components/ViewBookingCard";
import { Tab } from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";

export const UserPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("loggedIn") == "false") {
      navigate({ to: "/login" });
    }
  }, []);

  const [timePeriod, setTimePeriod] = useState("future");
  const [tabValue, setTabValue] = useState("1");
  const [trackChange, setTrackChange] = useState(0);

  function getBookings() {
    const userId = Number(localStorage.getItem("userId"));
    return fetch(`http://localhost:8080/api/bookings/${timePeriod}/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      });
  }

  const { data, isLoading } = useQuery({
    queryKey: ["myBookings", trackChange, timePeriod],
    queryFn: getBookings,
  });

  const tabChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log(timePeriod);
    setTabValue(newValue);
    if (newValue == "1") {
      setTimePeriod("future");
    } else {
      setTimePeriod("past");
    }
  };

  return (
    <div className="p-8">
      <h1>My Bookings</h1>

      <TabContext value={tabValue}>
        <TabList onChange={tabChange}>
          <Tab label="Current bookings" value="1"></Tab>
          <Tab label="Previous bookings" value="2"></Tab>
        </TabList>
        <TabPanel value={tabValue}>
          {!isLoading && data.length != 0 ? (
            data.map((value: BookingDetails) => (
              <ViewBookingCard
                key={value.id}
                bookingDetails={value}
                timePeriod={timePeriod}
                trackChange={trackChange}
                setTrackChange={setTrackChange}
              />
            ))
          ) : (
            <p>There are no bookings</p>
          )}
        </TabPanel>
      </TabContext>
    </div>
  );
};
