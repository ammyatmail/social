import {
  Typography,
  Button,
  makeStyles,
  Paper,
  Toolbar,
} from "@material-ui/core";
import {
  DelayedLinearProgress,
  SnackbarContext,
  SortableTable,
} from "components";
import { SortableTableHeader } from "components/SortableTable/components";
import { useApiClient } from "hooks";
import * as React from "react";
import { MasterProfileList } from "models/MasterProfileList";

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(10),
  },
  primaryLink: {
    color: theme.palette.primary.main,
    textTransform: "uppercase",
    textDecoration: "none",
  },
  secondaryLink: {
    textDecoration: "none",
    color: theme.palette.secondary.main,
  },
}));
export const ProfileContainer: React.FC = () => {
  const classes = useStyles();
  const [{ data: dataProfiles, loading: profileLoading, error: errorProfile }] =
    useApiClient<MasterProfileList>("/api/search");

  console.log("data - ", dataProfiles);
  console.log("data - ", dataProfiles?.items.length);

  const snackbar = React.useContext(SnackbarContext);

  React.useEffect(() => {
    if (errorProfile) {
      snackbar.error(errorProfile);
    }
  }, [errorProfile, snackbar]);
  const columns: SortableTableHeader[] = [
    {
      key: "name",
      label: "Name",
      props: { style: { width: "60%" } },
    },
    {
      key: "status",
      label: "Status",
      props: { style: { width: "20%" } },
    },
    {
      key: "camera",
      label: "No. of camera",
      props: { style: { width: "20%" } },
    },
  ];
  return (
    <React.Fragment>
      <Paper style={{ marginBottom: 16 }}>
        {profileLoading && <DelayedLinearProgress />}
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography variant="h6">Zones</Typography>
          <Button color="primary">Add Zone</Button>
        </Toolbar>
        <SortableTable
          columns={columns}
          rows={[]}
          emptyTableText="No zone available yet."
          disablePagination
        />
      </Paper>
    </React.Fragment>
  );
};
