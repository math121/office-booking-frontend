import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Button,
} from "@mui/material";
import { Office } from "../utils/types";
import { useNavigate } from "@tanstack/react-router";

export const OfficeCard = ({ office }: { office: Office }) => {
  const navigate = useNavigate();
  const redirect = () => {
    if (localStorage.getItem("loggedIn") == "false") {
      navigate({ to: "/login" });
    } else {
      navigate({
        to: "/newBooking",
        state: { bookingState: { office: office } },
      });
    }
  };

  return (
    <div>
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          sx={{ height: 250 }}
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
          <Button
            variant="contained"
            style={{ backgroundColor: "#1E1B1A" }}
            sx={{
              marginLeft: "auto",
              marginTop: "auto",
              marginRight: 2,
              marginBottom: 2,
            }}
            onClick={redirect}
          >
            Book now
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
