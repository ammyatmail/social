import { Typography, Grid, makeStyles } from "@material-ui/core";
import * as React from "react";
import BackgroundImage from "./../../../../layouts/App/assets/News.jpg";

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
  title: {
    padding: theme.spacing(10, 0, 2, 0),
  },
}));
export const News: React.FC = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.background}>
        <Grid container className={classes.grid}>
          <Grid item xs={12} md={6} lg={6}>
            <Typography variant="h2" className={classes.title}>
              <strong>ROMEO’s Valentine’s Day Special!</strong>
            </Typography>

            <Typography variant="h5" className={classes.title}>
              <strong>
                {" "}
                Single and ready to mingle? Want to get lucky in love? ROMEO is
                here to help! This blog contains instructions on how to be
                featured across our social media platforms!
              </strong>{" "}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};
