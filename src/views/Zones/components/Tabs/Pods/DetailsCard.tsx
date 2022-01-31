import * as React from "react";
import {
  Card,
  CardHeader,
  Button,
  CardActions,
  makeStyles,
  Typography,
  Grid,
  CardContent,
} from "@material-ui/core";
import { Zone } from "models/Zone";

interface Props {
  zone: Zone;
}
const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(1),
  },
  secondaryLink: {
    textDecoration: "none",
    color: theme.palette.secondary.main,
  },
  profileHeading: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  profileHeadingAvatar: {
    marginRight: theme.spacing(1),
    border: "1px solid #fff",
  },
}));
export const DetailsCard: React.FC<Props> = ({ zone }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader title={zone.name} subheader={zone.address.region} />
      <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Grid container>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Typography variant="caption">Contact number</Typography>
            <Typography variant="body1">{zone.phone ?? "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Typography variant="caption">Country</Typography>
            <Typography variant="body1">
              {zone.address.country ?? "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Typography variant="caption">Residence</Typography>
            <Typography variant="body1">{zone.address.city}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Typography variant="caption">Postal Code</Typography>
            <Typography variant="body1">{zone.address.postalCode}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button color="primary">Edit</Button>
      </CardActions>
    </Card>
  );
};
