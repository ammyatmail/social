import {
  Button,
  makeStyles,
  Card,
  CardHeader,
  Grid,
  Tooltip,
} from "@material-ui/core";
import {
  DelayedLinearProgress,
  SnackbarContext,
  SortableTable,
} from "components";
import { SortableTableHeader } from "components/SortableTable/components";
import { useApiClient, useDebounce } from "hooks";
import * as React from "react";
import { Zone } from "models/Zone";
import { Link } from "react-router-dom";
import { Camera } from "models/Camera";
import { Device } from "models/Device";
import {
  CloudDone,
  CloudOff,
  Info,
  SignalWifi4Bar,
  SignalWifiOff,
} from "@material-ui/icons";
import { CameraSearch } from "./CameraSearch";
import { CameraStatus } from "models/CameraStatus";

export enum ConnectionStatus {
  ONLINE = "Online",
  OFFLINE = "Offline",
}

export interface SearchParam {
  connectionStatus: ConnectionStatus | null;
  searchText: string | null;
}
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

  icon: {
    margin: theme.spacing(0, 0.6),
  },
}));
export const CameraContainer: React.FC = () => {
  const classes = useStyles();
  const snackbar = React.useContext(SnackbarContext);

  const [variables, setVariables] = React.useState<SearchParam>({
    searchText: null,
    connectionStatus: null,
  });

  const [{ data: cameras, loading, error: errorCamera }] =
    useApiClient<Camera[]>("/cameras");
  const [
    { data: cameraStatusData, loading: statusLoading, error: errorLoading },
  ] = useApiClient<CameraStatus[]>("/cameras/all/status");

  const [{ data: zones, loading: zoneLoading, error: errorZone }] =
    useApiClient<Zone[]>("/zones");
  const [{ data: devices, loading: deviceLoading, error: errorDevice }] =
    useApiClient<Device[]>(`/deviceTypes`);

  const debouncedFilter = useDebounce(variables.searchText, 500);

  React.useEffect(() => {
    if (errorCamera || errorLoading || errorDevice || errorZone) {
      snackbar.error(errorCamera);
    }
  }, [errorCamera, errorLoading, errorDevice, errorZone, snackbar]);

  const displayData = React.useCallback(() => {
    return (
      cameras?.filter((m) => {
        let res =
          debouncedFilter !== null &&
          (m.name.toLowerCase().indexOf(debouncedFilter.toLowerCase()) !== -1 ||
            m.ethMacAddress
              .toLowerCase()
              .indexOf(debouncedFilter.toLowerCase()) !== -1);

        if (debouncedFilter === null) {
          res = true;
        }
        if (variables.connectionStatus === null) {
          return res;
        }

        const onlineStatus =
          cameraStatusData?.find((l) => l.cameraId === m.cameraId)?.online ??
          false;
        if (variables.connectionStatus === ConnectionStatus.ONLINE) {
          return res && onlineStatus;
        } else if (variables.connectionStatus === ConnectionStatus.OFFLINE) {
          return res && !onlineStatus;
        }

        return res;
      }) ?? []
    );
  }, [cameras, debouncedFilter, variables.connectionStatus, cameraStatusData]);

  const columns: SortableTableHeader[] = [
    {
      key: "name",
      label: "Name",
      props: { style: { width: "40%" } },
    },
    {
      key: "zone",
      label: "Zone",
      props: { style: { width: "20%" } },
      sortable: false,
    },
    {
      key: "deviceType",
      label: "Type",
      props: { style: { width: "20%" } },
      sortable: false,
    },
    {
      key: "info",
      label: "Status",
      props: { style: { width: "20%" } },
      sortable: false,
    },
  ];
  const rows =
    displayData()?.map((camera) => ({
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
          key: "zone",
          display: (
            <React.Fragment>
              <a
                className={classes.secondaryLink}
                href={`/zones/${camera.zoneId}`}
              >
                {zones?.find((m) => m.zoneId === camera.zoneId)?.name}
              </a>
            </React.Fragment>
          ),
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
        },
        {
          key: "info",
          display: (
            <React.Fragment>
              <Tooltip
                title={
                  getOnlineStatus(camera.cameraId)
                    ? "Connection status - Online"
                    : "Connection status - Offline"
                }
              >
                {getOnlineStatus(camera.cameraId) ? (
                  <SignalWifi4Bar className={classes.icon} />
                ) : (
                  <SignalWifiOff className={classes.icon} />
                )}
              </Tooltip>
              <Tooltip
                title={
                  getCloudStatus(camera.cameraId)
                    ? "Cloud recording status - Online"
                    : "Cloud recording status - Offline"
                }
              >
                {getCloudStatus(camera.cameraId) ? (
                  <CloudDone className={classes.icon} />
                ) : (
                  <CloudOff className={classes.icon} />
                )}
              </Tooltip>
            </React.Fragment>
          ),
          sortValue: camera.ethMacAddress,
        },
      ],
    })) ?? [];
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <CameraSearch setVariables={setVariables} variables={variables} />
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9}>
          <Card>
            {(loading || zoneLoading || deviceLoading || statusLoading) && (
              <DelayedLinearProgress />
            )}
            <CardHeader
              title="Cameras"
              action={<Button color="primary">Add camera</Button>}
            />
            <SortableTable
              columns={columns}
              rows={rows}
              emptyTableText="No camera available yet."
              disablePagination
            />
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );

  function getOnlineStatus(cameraId: string) {
    return (
      cameraStatusData?.find((m) => m.cameraId === cameraId)?.online ?? false
    );
  }

  function getCloudStatus(cameraId: string) {
    return (
      cameraStatusData?.find((m) => m.cameraId === cameraId)
        ?.recordingOnCloud ?? false
    );
  }
};
