import { Card, CardActions, CardContent, Button } from "@mui/material";
import { BookingDetails } from "../utils/types";

export const ViewBookingCard = ({
  bookingDetails,
}: {
  bookingDetails: BookingDetails;
}) => {
  const editBooking = () => {
    console.log("edit");
  };
  const deleteBooking = () => {
    console.log("delete");
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
        <CardActions>
          <Button onClick={editBooking}>Edit</Button>
          <Button onClick={deleteBooking}>Delete</Button>
        </CardActions>
      </Card>
    </div>
  );
};
