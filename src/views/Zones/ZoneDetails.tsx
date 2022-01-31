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
import { Zone } from "models/Zone";
import { ZoneTab } from "./ZoneTab";
import { useParams } from "react-router-dom";
import { ZoneDashboardTab } from "./components";
import { ZoneCameraTab } from "./components/Tabs/ZoneCameraTab";

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
export const ZoneDetails: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams<Params>();
  const [{ data: zone, loading, error: errorZone }] = useApiClient<Zone>(
    `/zones/${id}`
  );
  const snackbar = React.useContext(SnackbarContext);

  React.useEffect(() => {
    if (errorZone) {
      snackbar.error(errorZone);
    }
  }, [errorZone, snackbar]);

  const tabs = [
    {
      label: "Dashboard",
      value: ZoneTab.DASHBOARD,
    },
    {
      label: "Cameras",
      value: ZoneTab.CAMERAS,
    },
  ];

  return (
    <React.Fragment>
      <DelayedLinearProgress loading={loading} />
      {zone && (
        <AppBar position="static">
          <Toolbar>
            <div className={classes.profileHeading}>
              <Avatar className={classes.profileHeadingAvatar} alt={zone.name}>
                {zone.name ??
                  ""
                    .match(/\b[A-Z]/gi)
                    ?.slice(0, 2)
                    .join("")
                    .toUpperCase()}
              </Avatar>
              <Typography variant="h6">{zone.name}</Typography>
            </div>
          </Toolbar>
        </AppBar>
      )}

      {zone && (
        <AppTabs tabs={tabs}>
          {(activeTab) => {
            let currTab: React.ReactNode = null;

            switch (activeTab) {
              case ZoneTab.DASHBOARD:
                currTab = <ZoneDashboardTab zone={zone} />;
                break;
              case ZoneTab.CAMERAS:
                currTab = <ZoneCameraTab />;
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
