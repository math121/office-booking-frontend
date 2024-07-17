import { Card, CardActions, CardContent, Button } from "@mui/material";
import { BookingDetails } from "../utils/types";
import { EditBooking } from "./EditBooking";
import { DeleteDialog } from "./DeleteDialog";

export const ViewBookingCard = ({
  bookingDetails,
  timePeriod,
}: {
  bookingDetails: BookingDetails;
  timePeriod: string;
}) => {
  const deleteBooking = () => {
    console.log("hey");
    console.log(bookingDetails.id);
    fetch(`http://localhost:8080/api/bookings/${bookingDetails.id}`, {
      method: "DELETE",
    })
      .then((response) => console.log(response.json()))
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-8">
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
              <p>{new Date(bookingDetails.startDate).toLocaleString()}</p>
            </div>
            <div className="flex  gap-2">
              <p className="font-bold">To: </p>
              <p>{new Date(bookingDetails.endDate).toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
        {timePeriod == "future" && (
          <CardActions>
            <EditBooking bookingDetails={bookingDetails} />
            <DeleteDialog deleteBooking={deleteBooking} />
            <Button onClick={deleteBooking}>Delete</Button>
          </CardActions>
        )}
      </Card>
    </div>
  );
};
