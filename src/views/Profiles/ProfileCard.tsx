import {
  Card,
  CardContent,
  Grid,
  Tooltip,
  Typography,
  CardActions,
  CardMedia,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import {
  AccessibilityNew,
  FiberManualRecord,
  Info,
  PregnantWoman,
  VerifiedUser,
} from "@material-ui/icons";
import { parseName } from "lib";
import { Profile } from "models/Profile";
import * as React from "react";
import errorImage from "../../layouts/App/assets/error.png";
import { formatDistanceToNow, parseISO } from "date-fns";

enum OnlineStatus {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  DATE = "DATE",
}

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardContent: {
    padding: 0,
    margin: 0,
  },
  titleArea: {
    position: "relative",
    top: -40,
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  infoIcon: {
    marginRight: theme.spacing(1),
    color: "#fff",
  },
  verifiedIcon: {
    marginLeft: theme.spacing(1),
  },
  title: {
    fontWeight: "bold",
    color: "#fff",
    paddingLeft: 10,
  },
}));

interface Props {
  profileItem: Profile;
}

export const ProfileCard = React.memo<Props>(({ profileItem }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <CardMedia
            component="img"
            height="100%"
            image={profileItem.picture?.url ?? errorImage}
            alt={profileItem.picture?.comment}
          />
          {profileItem.picture && (
            <div className={classes.titleArea}>
              <div style={{ display: "flex" }}>
                <Typography variant="h5" className={classes.title}>
                  {parseName(profileItem.name)[0] ?? ""}
                </Typography>
                <Tooltip title="Verified">
                  <VerifiedUser
                    color="primary"
                    className={classes.verifiedIcon}
                  />
                </Tooltip>
              </div>

              <Tooltip title="Details">
                <Info className={classes.infoIcon} />
              </Tooltip>
            </div>
          )}
        </CardContent>
        <CardActions disableSpacing>
          <Tooltip
            title={getOnlineStatusText(
              profileItem.onlineStatus as OnlineStatus,
              profileItem.lastLogin
            )}
          >
            <FiberManualRecord
              style={{
                color: getOnlineStatusColor(
                  profileItem.onlineStatus as OnlineStatus
                ),
              }}
            />
          </Tooltip>
          {profileItem.isPlus && (
            <Tooltip title="Plus size">
              <PregnantWoman />
            </Tooltip>
          )}
          {!profileItem.isPlus && (
            <Tooltip title="Slim">
              <AccessibilityNew />
            </Tooltip>
          )}
        </CardActions>
      </Card>
    </Grid>
  );

  function getOnlineStatusColor(val: OnlineStatus) {
    switch (val) {
      case OnlineStatus.ONLINE:
        return theme.palette.success.main.toString();
      case OnlineStatus.OFFLINE:
        return theme.palette.error.main.toString();
      case OnlineStatus.DATE:
        return theme.palette.warning.main.toString();
      default:
        return theme.palette.success.main.toString();
    }
  }

  function getOnlineStatusText(val: OnlineStatus, lastDate: Date) {
    const time = formatDistanceToNow(parseISO(lastDate.toString()), {
      addSuffix: true,
    });
    switch (val) {
      case OnlineStatus.ONLINE:
        return "Online";
      case OnlineStatus.OFFLINE:
        return "Offline, last login time: " + time;
      case OnlineStatus.DATE:
        return "Away, last login time: " + time;
      default:
        return "Online";
    }
  }
});
