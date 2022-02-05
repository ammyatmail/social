import { Typography, Grid, makeStyles, Button } from "@material-ui/core";
import * as React from "react";
import { Link } from "react-router-dom";
import BackgroundImage from "./../../layouts/App/assets/dashboard.jpg";
const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${BackgroundImage})`,
    height: "98vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    padding: theme.spacing(0, 0.5, 2, 0.5),
    color: theme.palette.common.white,
  },
  grid: {
    padding: theme.spacing(10),
  },
  subTitle: {
    padding: theme.spacing(0.5, 0),
  },
  title: {
    padding: theme.spacing(10, 0, 2, 0),
  },
  btn: {
    fontSize: 30,
    textTransform: "none",
  },
}));
export const Dashboard: React.FC = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.background}>
        <Grid container className={classes.grid}>
          <Grid item xs={12} md={6} lg={6}>
            <Typography variant="h1" className={classes.title}>
              <strong>GAY DATING</strong>
            </Typography>
            <Typography variant="h3" className={classes.subTitle}>
              that goes deeper
            </Typography>
            <Typography variant="h5" className={classes.subTitle}>
              From horny hook-ups, to the man of your dreams. Find guys in your
              area and browse through detailed profiles. Use the search and
              filters to zoom in to your perfect man. And it's Free!
            </Typography>
            <Button
              component={Link}
              to="/profiles"
              color="secondary"
              className={classes.btn}
            >
              explore
            </Button>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};
