import {
  Typography,
  makeStyles,
  Avatar,
  Toolbar,
  AppBar,
} from "@material-ui/core";
import { DelayedLinearProgress, AppTabs, SnackbarContext } from "components";
import { useApiClient } from "hooks";
import * as React from "react";
import { CameraTab } from "./CameraTab";
import { useParams } from "react-router-dom";
import { Camera } from "models/Camera";
import { CameraDashboardTab } from "./components";
import { Zone } from "models/Zone";
import { Device } from "models/Device";

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(10),
  },

  secondaryLink: {
    textDecoration: "none",
    color: theme.palette.secondary.main,
  },
  profileHeading: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  profileHeadingAvatar: {
    marginRight: theme.spacing(1),
    border: "1px solid #fff",
  },
}));
interface Params {
  id: string;
}
export const CameraDetails: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams<Params>();
  const [{ data: camera, loading, error: errorCamera }] = useApiClient<Camera>(
    `/cameras/${id}`
  );
  const snackbar = React.useContext(SnackbarContext);

  React.useEffect(() => {
    if (errorCamera) {
      snackbar.error(errorCamera);
    }
  }, [errorCamera, snackbar]);
  const [{ data: zones, loading: zoneLoading }] =
    useApiClient<Zone[]>("/zones");
  const [{ data: devices, loading: deviceLoading }] =
    useApiClient<Device[]>(`/deviceTypes`);

  const tabs = [
    {
      label: "Dashboard",
      value: CameraTab.DASHBOARD,
    },
  ];

  return (
    <React.Fragment>
      <DelayedLinearProgress
        loading={loading || deviceLoading || zoneLoading}
      />
      {camera && (
        <AppBar position="static">
          <Toolbar>
            <div className={classes.profileHeading}>
              <Avatar
                className={classes.profileHeadingAvatar}
                alt={camera.name}
              >
                {camera.name ??
                  ""
                    .match(/\b[A-Z]/gi)
                    ?.slice(0, 2)
                    .join("")
                    .toUpperCase()}
              </Avatar>
              <Typography variant="h6">{camera.name}</Typography>
            </div>
          </Toolbar>
        </AppBar>
      )}

      {camera && (
        <AppTabs tabs={tabs}>
          {(activeTab) => {
            let currTab: React.ReactNode = null;

            switch (activeTab) {
              case CameraTab.DASHBOARD:
                currTab = (
                  <CameraDashboardTab
                    camera={camera}
                    zones={zones ?? []}
                    devices={devices ?? []}
                  />
                );
                break;
              default:
            }
            return <React.Fragment>{currTab}</React.Fragment>;
          }}
        </AppTabs>
      )}
    </React.Fragment>
  );
};
