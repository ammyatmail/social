import { Typography, Grid, makeStyles } from "@material-ui/core";
import * as React from "react";
import BackgroundImage from "./../../layouts/App/assets/future.webp";
const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${BackgroundImage})`,
    height: "90vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    padding: theme.spacing(0, 0.5, 2, 0.5),
    color: theme.palette.common.white,
  },
  grid: {
    padding: theme.spacing(10),
  },
  title: {
    padding: theme.spacing(2.5, 0),
  },
  subTitle: {},
}));
export const Dashboard: React.FC = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.background}>
        <Grid container className={classes.grid}>
          <Grid item xs={12} md={6} lg={6}>
            <Typography variant="h5" className={classes.title}>
              INNOVATE AT SCALE AND PACE
            </Typography>
            <Typography variant="h3" className={classes.title}>
              Future Proof Your Investment
            </Typography>
            <Typography variant="body1" className={classes.title}>
              Eagle Eye Networks is changing the video surveillance industry
              with the Eagle Eye Video API platform, a secure, open platform
              that provides the flexibility and scalability to meet your
              evolving needs, instantly.
            </Typography>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};
