import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Button,
} from "@mui/material";
import { Office } from "../utils/types";
import loginData from "../utils/login.json";
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
    if (loginData.loggedIn == false) {
      navigate({ to: "/login" });
    } else {
      navigate({
        to: "/newBooking",
        state: { bookingState: { office: office }, userState: { id: userId } },
      });
    }
  };
  return (
    <>
      <Card sx={{ maxWidth: 300, border: "solid 2px" }}>
        <CardMedia
          sx={{ height: 150 }}
          title="Office pic"
          image="https://picsum.photos/id/25/200/300"
        />
        <CardContent>
          <h2>{office.officeName}</h2>
          <p>{office.location}</p>
          <p>{office.description}</p>
        </CardContent>
        <CardActions>
          <Button onClick={redirect}>Book now</Button>
        </CardActions>
      </Card>
    </>
  );
};
