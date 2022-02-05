import {
  Card,
  CardContent,
  Grid,
  Tooltip,
  Typography,
  CardActions,
  CardMedia,
  makeStyles,
} from "@material-ui/core";
import { FiberManualRecord, Info, VerifiedUser } from "@material-ui/icons";
import { parseName } from "lib";
import { Profile } from "models/Profile";
import * as React from "react";
import errorImage from "../../layouts/App/assets/error.png";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    paddingTop: theme.spacing(2),
  },
  cardContent: {
    padding: 0,
    margin: 0,
  },
  titleArea: {
    position: "relative",
    top: -40,
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  infoIcon: {
    marginRight: theme.spacing(1),
    color: "#fff",
  },
  verifiedIcon: {
    marginLeft: theme.spacing(1),
  },
  title: {
    fontWeight: "bold",
    color: "#fff",
    paddingLeft: 10,
  },
  grid: {
    padding: theme.spacing(10),
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
  font: {
    position: "absolute",
    top: "80%",
    color: "black",
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  cutOut: {
    textDecoration: "line-through",
  },
}));

interface Props {
  profileItem: Profile;
}

export const ProfileCard = React.memo<Props>(({ profileItem }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <CardMedia
            component="img"
            height="100%"
            image={profileItem.picture?.url ?? errorImage}
            alt={profileItem.picture?.comment}
          />
          {profileItem.picture && (
            <div className={classes.titleArea}>
              <div style={{ display: "flex" }}>
                <Typography variant="h5" className={classes.title}>
                  {parseName(profileItem.name)[0] ?? ""}
                </Typography>
                <Tooltip title="Verified">
                  <VerifiedUser
                    color="primary"
                    className={classes.verifiedIcon}
                  />
                </Tooltip>
              </div>

              <Tooltip title="Details">
                <Info className={classes.infoIcon} />
              </Tooltip>
            </div>
          )}
        </CardContent>
        <CardActions disableSpacing>
          <FiberManualRecord />
        </CardActions>
      </Card>
    </Grid>
  );
});
