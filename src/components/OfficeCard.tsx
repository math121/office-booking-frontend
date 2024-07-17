import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Button,
} from "@mui/material";
import { Office } from "../utils/types";
import { useNavigate } from "@tanstack/react-router";

export const OfficeCard = ({
  office,
  userId,
}: {
  office: Office;
  userId: number | undefined;
}) => {
  const navigate = useNavigate();
  const redirect = () => {
    if (localStorage.getItem("loggedIn") == "false") {
      navigate({ to: "/login" });
    } else {
      navigate({
        to: "/newBooking",
        state: { bookingState: { office: office }, userState: { id: userId } },
      });
    }
  };
  console.log(office);
  return (
    <div>
      <Card sx={{ maxWidth: 300 }}>
        <CardMedia
          sx={{ height: 150 }}
          title="Office pic"
          image={office.image}
        />
        <CardContent>
          <h3>{office.officeName}</h3>
          <p>
            <strong>Location:</strong> {office.location}
          </p>
          <p>{office.description}</p>
        </CardContent>
        <CardActions>
          <Button onClick={redirect}>Book now</Button>
        </CardActions>
      </Card>
    </div>
  );
};
