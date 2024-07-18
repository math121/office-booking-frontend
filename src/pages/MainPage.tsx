import { OfficeCard } from "../components/OfficeCard";
import { useQuery } from "@tanstack/react-query";
import { Office } from "../utils/types";
import { SearchBar } from "../components/SearchBar";
import { useState } from "react";
import { LoadingFailPage } from "../components/LoadingFailPage";
import { ToastContainer } from "react-toastify";

const BASE_URL_OFFICE = "http://localhost:8080/api/offices";

export const MainPage = () => {
  const [filterWord, setFilterWord] = useState("");

  function getAllOffices() {
    let officeUrl = BASE_URL_OFFICE;

    if (filterWord != "") {
      officeUrl += `/${filterWord}`;
    }

    return fetch(officeUrl)
      .then((response) => response.json())
      .then((data) => data);
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["allOffices", filterWord],
    queryFn: getAllOffices,
  });

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <h1>Browse Offices</h1>
        <SearchBar setFilterWord={setFilterWord} />
      </div>

      <div className="grid auto-rows-fr gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {!isLoading &&
          !isError &&
          data &&
          data.length != 0 &&
          data.map((value: Office) => (
            <OfficeCard key={value.id} office={value} />
          ))}
        {isLoading && <LoadingFailPage message="Loading..." />}
        {isError && <LoadingFailPage message="Failed to fetch" />}
      </div>
      <ToastContainer />
    </div>
  );
};
