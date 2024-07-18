import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BookingDetails } from "../utils/types";
import { ViewBookingCard } from "../components/ViewBookingCard";
import { Tab } from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import { SearchBar } from "../components/SearchBar";
import { ToastContainer } from "react-toastify";
import { LoadingFailPage } from "../components/LoadingFailPage";

const BASE_URL_BOOKING = "http://localhost:8080/api/bookings";

export const UserPage = () => {
  const navigate = useNavigate();
  const [filterLocation, setFilterLocation] = useState("");

  useEffect(() => {
    window.scroll(0, 0);
    if (localStorage.getItem("loggedIn") == "false") {
      navigate({ to: "/login" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [timePeriod, setTimePeriod] = useState("future");
  const [tabValue, setTabValue] = useState("1");
  const [trackChange, setTrackChange] = useState(0);

  function getBookings() {
    const userId = Number(localStorage.getItem("userId"));
    let booking_url = BASE_URL_BOOKING + `/${timePeriod}/${userId}`;

    if (filterLocation != "") {
      booking_url += `/${filterLocation}`;
    }

    return fetch(booking_url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      });
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["myBookings", trackChange, timePeriod, filterLocation],
    queryFn: getBookings,
  });

  const tabChange = (_event: React.SyntheticEvent, newValue: string) => {
    console.log(timePeriod);
    setTabValue(newValue);
    if (newValue == "1") {
      setTimePeriod("future");
      setFilterLocation("");
    } else {
      setTimePeriod("past");
      setFilterLocation("");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <h1>My Bookings</h1>
        <SearchBar setFilterWord={setFilterLocation} />
      </div>

      <TabContext value={tabValue}>
        <TabList onChange={tabChange}>
          <Tab label="Current bookings" value="1"></Tab>
          <Tab label="Previous bookings" value="2"></Tab>
        </TabList>
        <TabPanel value={tabValue}>
          {!isLoading &&
            !error &&
            data &&
            data.length != 0 &&
            data.map((value: BookingDetails) => (
              <ViewBookingCard
                key={value.id}
                bookingDetails={value}
                timePeriod={timePeriod}
                trackChange={trackChange}
                setTrackChange={setTrackChange}
              />
            ))}
          {data && data.length == 0 && <p>There are no bookings</p>}
          {isLoading && <LoadingFailPage message="Loading..." />}
          {error && <LoadingFailPage message={error.message} />}
        </TabPanel>
      </TabContext>
      <ToastContainer />
    </div>
  );
};
