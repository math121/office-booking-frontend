import { OfficeCard } from "../components/OfficeCard";
import { useQuery } from "@tanstack/react-query";
import { Office } from "../utils/types";
import { useRouterState } from "@tanstack/react-router";

export const MainPage = () => {
  const userId = useRouterState({
    select: (s) => s.location.state.userState?.id,
  });

  function getAllOffices() {
    return fetch("http://localhost:8080/api/offices")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      });
  }

  const { data, isLoading } = useQuery({
    queryKey: ["allOffices"],
    queryFn: getAllOffices,
  });

  return (
    <>
      <h1>Browse Offices</h1>
      {!isLoading &&
        data.length != 0 &&
        data.map((value: Office) => (
          <OfficeCard key={value.id} office={value} userId={userId} />
        ))}
    </>
  );
};
