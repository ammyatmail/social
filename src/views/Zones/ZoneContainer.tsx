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
import { Zone } from "models/Zone";
import { Link } from "react-router-dom";

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
export const ZoneContainer: React.FC = () => {
  const classes = useStyles();
  const [{ data: zones, loading, error: errorZone }] =
    useApiClient<Zone[]>("/zones");
  const snackbar = React.useContext(SnackbarContext);

  React.useEffect(() => {
    if (errorZone) {
      snackbar.error(errorZone);
    }
  }, [errorZone, snackbar]);

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

  const rows =
    zones?.map((zone) => ({
      key: zone.zoneId.toString(),
      cells: [
        {
          key: "name",
          display: (
            <React.Fragment>
              <Link
                to={`/zones/${zone.zoneId.toString()}`}
                className={classes.primaryLink}
              >
                {zone.name}
              </Link>
              <br />
            </React.Fragment>
          ),
          sortValue: zone.name,
        },
        { key: "status", display: zone.status, sortValue: zone.status },
        {
          key: "camera",
          display: (
            <React.Fragment>
              {zone.cameraIds.length !== 0 ? (
                <a
                  className={classes.secondaryLink}
                  href={`/zones/${zone.zoneId}#cameras`}
                >
                  {`${zone.cameraIds.length} camera${
                    zone.cameraIds.length !== 1 ? "s" : ""
                  }`}
                </a>
              ) : (
                <Typography variant="caption" color={"textSecondary"}>
                  0 cameras
                </Typography>
              )}
            </React.Fragment>
          ),
          sortValue: zone.cameraIds.length,
        },
      ],
    })) ?? [];
  return (
    <React.Fragment>
      <Paper style={{ marginBottom: 16 }}>
        {loading && <DelayedLinearProgress />}
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography variant="h6">Zones</Typography>
          <Button color="primary">Add Zone</Button>
        </Toolbar>
        <SortableTable
          columns={columns}
          rows={rows}
          emptyTableText="No zone available yet."
          disablePagination
        />
      </Paper>
    </React.Fragment>
  );
};
