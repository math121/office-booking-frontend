import { Card, CardActions, CardContent } from "@mui/material";
import { BookingDetails } from "../utils/types";
import { EditBooking } from "./EditBooking";
import { DeleteDialog } from "./DeleteDialog";

export const ViewBookingCard = ({
  bookingDetails,
  timePeriod,
  trackChange,
  setTrackChange,
}: {
  bookingDetails: BookingDetails;
  timePeriod: string;
  trackChange: number;
  setTrackChange: (num: number) => void;
}) => {
  const deleteBooking = () => {
    fetch(`http://localhost:8080/api/bookings/${bookingDetails.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        console.log(response);
        setTrackChange(trackChange + 1);
      })
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
            <EditBooking
              bookingDetails={bookingDetails}
              trackChange={trackChange}
              setTrackChange={setTrackChange}
            />
            <DeleteDialog deleteBooking={deleteBooking} />
          </CardActions>
        )}
      </Card>
    </div>
  );
};
