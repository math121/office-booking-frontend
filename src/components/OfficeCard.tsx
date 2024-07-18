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
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <CardMedia
            title="Office pic"
            component="img"
            height="200"
            image={office.image || "src/assets/placeholder.png"}
            alt="Picture of office space"
          />
          <CardContent>
            <h3>{office.officeName}</h3>
            <p>
              <strong>Location:</strong> {office.location}
            </p>
            <p className="m-0">{office.description}</p>
          </CardContent>
        </div>

        <CardActions>
          <Button
            variant="contained"
            style={{ backgroundColor: "#1E1B1A" }}
            sx={{
              marginLeft: "auto",
              marginBottom: 1,
              marginRight: 1,
            }}
            onClick={redirect}
          >
            Book now
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
