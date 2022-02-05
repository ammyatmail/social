import { Grid, makeStyles } from "@material-ui/core";
import { DelayedLinearProgress, SnackbarContext } from "components";
import { useApiClient } from "hooks";
import * as React from "react";
import { MasterProfileList } from "models/MasterProfileList";
import { Pagination } from "@material-ui/lab";
import { ProfileCard } from "./ProfileCard";

const useStyles = makeStyles((theme) => ({
  pagination: {
    display: "flex",
    justifyContent: "center",
    paddingTop: theme.spacing(2),
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
    useApiClient<MasterProfileList>(
      `/api/search?length=${pageNumber * perPageDataLength}`
    );

  const totalPages = dataProfiles?.total
    ? Math.ceil(dataProfiles?.total / perPageDataLength)
    : 1;

  const getPaginationData = React.useCallback(
    function getPaginationData() {
      return (
        dataProfiles?.items.slice((pageNumber - 1) * perPageDataLength) ?? []
      );
    },
    [dataProfiles?.items, pageNumber]
  );

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
          <ProfileCard profileItem={item} key={index.toString()} />
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
};
