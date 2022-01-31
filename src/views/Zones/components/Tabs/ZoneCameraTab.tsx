import {
  makeStyles,
  Typography,
  Tooltip,
  Button,
  Paper,
  Toolbar,
} from "@material-ui/core";
import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { useApiClient } from "hooks";
import { Camera } from "models/Camera";
import { SortableTableHeader } from "components/SortableTable/components";
import { Info } from "@material-ui/icons";
import { DelayedLinearProgress, SortableTable } from "components";
import { Device } from "models/Device";

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
  infoIconDiv: {
    display: "flex",
    alignItems: "center",
  },
  infoIcon: {
    height: 15,
  },
}));
interface Params {
  id: string;
}
export const ZoneCameraTab: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams<Params>();
  const [{ data: cameras, loading }] = useApiClient<Camera[]>(
    `/zones/${id}/cameras`
  );

  const [{ data: devices }] = useApiClient<Device[]>(`/deviceTypes`);

  const columns: SortableTableHeader[] = [
    {
      key: "name",
      label: "Name",
      props: { style: { width: "60%" } },
    },
    {
      key: "deviceType",
      label: "Type",
      props: { style: { width: "20%" } },
      sortable: false,
    },
    {
      key: "address",
      label: "MAC Address",
      props: { style: { width: "20%" } },
    },
  ];

  const rows =
    cameras?.map((camera) => ({
      key: camera.cameraId.toString(),
      cells: [
        {
          key: "name",
          display: (
            <React.Fragment>
              <Link
                to={`/cameras/${camera.cameraId.toString()}`}
                className={classes.primaryLink}
              >
                {camera.name}
              </Link>
              <br />
            </React.Fragment>
          ),
          sortValue: camera.name,
        },
        {
          key: "deviceType",
          display: (
            <React.Fragment>
              <Tooltip
                title={
                  "Brand - " +
                    devices?.find((m) => m.deviceTypeId === camera.deviceTypeId)
                      ?.display.brand ?? ""
                }
              >
                <div className={classes.infoIconDiv}>
                  <span>
                    {devices?.find(
                      (m) => m.deviceTypeId === camera.deviceTypeId
                    )?.display.model ?? ""}
                  </span>
                  <Info className={classes.infoIcon} />
                </div>
              </Tooltip>
            </React.Fragment>
          ),
          sortable: false,
        },
        {
          key: "address",
          display: camera.ethMacAddress,
          sortValue: camera.ethMacAddress,
        },
      ],
    })) ?? [];
  return (
    <React.Fragment>
      <Paper style={{ marginBottom: 16 }}>
        {loading && <DelayedLinearProgress />}
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography variant="h6">Zones</Typography>
          <Button color="primary">Add Camera</Button>
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
