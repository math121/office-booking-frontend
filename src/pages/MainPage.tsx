import { OfficeCard } from "../components/OfficeCard";
import { useQuery } from "@tanstack/react-query";
import { Office } from "../utils/types";

export const MainPage = () => {
  function getAllOffices() {
    return fetch("http://localhost:8080/api/offices")
      .then((response) => response.json())
      .then((data) => data);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["allOffices"],
    queryFn: getAllOffices,
  });

  return (
    <div className="p-8">
      <h1>Browse Offices</h1>
      <div className="grid gap-5 place-content-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {!isLoading &&
          data.length != 0 &&
          data.map((value: Office) => (
            <OfficeCard key={value.id} office={value} />
          ))}
      </div>
    </div>
  );
};
