import { Card, CardActions, CardContent, Button } from "@mui/material";
import { BookingDetails } from "../utils/types";
import { EditBooking } from "./EditBooking";

export const ViewBookingCard = ({
  bookingDetails,
  timePeriod,
}: {
  bookingDetails: BookingDetails;
  timePeriod: string;
}) => {
  const deleteBooking = () => {
    fetch(`http://localhost:8080/api/bookings/${bookingDetails.id}`, {
      method: "DELETE",
    }).then((response) => console.log(response.json()));
  };
  return (
    <div>
      <Card>
        <CardContent>
          <h3>{bookingDetails.office.officeName}</h3>
          <div className="flex gap-10">
            <div className="flex gap-2">
              <p className="font-bold">Location: </p>
              <p>{bookingDetails.office.location}</p>
            </div>
            <div className="flex  gap-2">
              <p className="font-bold">From: </p>
              <p>{bookingDetails.startDate}</p>
            </div>
            <div className="flex  gap-2">
              <p className="font-bold">To: </p>
              <p>{bookingDetails.endDate}</p>
            </div>
          </div>
        </CardContent>
        {timePeriod == "future" && (
          <CardActions>
            <EditBooking bookingDetails={bookingDetails} />

            <Button onClick={deleteBooking}>Delete</Button>
          </CardActions>
        )}
      </Card>
    </div>
  );
};
