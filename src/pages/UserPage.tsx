import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import loginData from "../utils/login.json";
import { useQuery } from "@tanstack/react-query";
//import { useRouterState } from "@tanstack/react-router";
import { BookingDetails } from "../utils/types";
import { ViewBookingCard } from "../components/ViewBookingCard";
import { Tab } from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";

export const UserPage = () => {
  const navigate = useNavigate();

  /*const userId = useRouterState({
    select: (s) => s.location.state.userState?.id,
  });*/

  useEffect(() => {
    if (loginData.loggedIn == false) {
      navigate({ to: "/login" });
    }
  }, []);

  const [timePeriod, setTimePeriod] = useState("future");
  const [tabValue, setTabValue] = useState("1");

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

  const tabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    if (newValue == "1") {
      setTimePeriod("future");
    } else {
      setTimePeriod("past");
    }
  };

  return (
    <>
      <h1>My Page</h1>

      <TabContext value={tabValue}>
        <TabList onChange={tabChange}>
          <Tab label="Current bookings" value="1"></Tab>
          <Tab label="Previous bookings" value="2"></Tab>
        </TabList>
        <TabPanel value={tabValue}>
          {!isLoading &&
            data.length != 0 &&
            data.map((value: BookingDetails) => (
              <ViewBookingCard key={value.id} bookingDetails={value} />
            ))}
        </TabPanel>
      </TabContext>
    </>
  );
};
