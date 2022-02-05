import {
  Card,
  Grid,
  makeStyles,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
} from "@material-ui/core";
import { DelayedLinearProgress, SnackbarContext } from "components";
import { useApiClient } from "hooks";
import * as React from "react";
import { MasterProfileList } from "models/MasterProfileList";
import { FiberManualRecord } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  card: { padding: theme.spacing(1.2) },
  pagination: {
    display: "flex",
    justifyContent: "center",
    paddingTop: theme.spacing(2),
  },
  cardContent: {
    padding: 0,
    margin: 0,
  },
  title: {
    position: "relative",
    top: -40,
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
}));
export const ProfileContainer: React.FC = () => {
  const classes = useStyles();
  const perPageDataLength = 20;
  const [pageNumber, setPage] = React.useState<number>(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const [{ data: dataProfiles, loading: profileLoading, error: errorProfile }] =
    useApiClient<MasterProfileList>("/api/search", {
      length: pageNumber * perPageDataLength,
    });

  const totalPages = dataProfiles?.total
    ? Math.ceil(dataProfiles?.total / perPageDataLength)
    : 1;

  // const getPaginationData = React.useCallback(

  function getPaginationData() {
    return (
      dataProfiles?.items.slice((pageNumber - 1) * perPageDataLength) ?? []
    );
  }
  //, []);

  const snackbar = React.useContext(SnackbarContext);

  React.useEffect(() => {
    if (errorProfile) {
      snackbar.error(errorProfile);
    }
  }, [errorProfile, snackbar]);

  return (
    <React.Fragment>
      <DelayedLinearProgress loading={profileLoading} />

      <Grid container>
        {getPaginationData().map((item, index) => (
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={3}
            key={index.toString()}
            className={classes.grid}
          >
            <Card>
              <CardContent className={classes.cardContent}>
                {profileLoading && (
                  <CardMedia
                    component="img"
                    height="100%"
                    image={item.picture?.url}
                    alt={item.picture?.comment}
                  />
                )}
                <Typography variant="h5" className={classes.title}>
                  {getName(item.name)[0] ?? ""}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <FiberManualRecord />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div className={classes.pagination}>
        <Pagination
          count={totalPages}
          color="primary"
          onChange={handleChange}
          showFirstButton
          showLastButton
        />
      </div>
    </React.Fragment>
  );

  function getName(name: string) {
    const val = name.match(/[A-Z][a-z]+|[0-9]+/g);
    return val ?? [""];
  }
};
