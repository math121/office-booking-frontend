import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Button,
} from "@mui/material";
import { Office } from "../utils/types";

export const OfficeCard = ({ office }: { office: Office }) => {
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
          <Button>Book now</Button>
        </CardActions>
      </Card>
    </>
  );
};
