import {
  Card,
  CardContent,
  Grid,
  Tooltip,
  Typography,
  IconButton,
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
import { getOnlineStatusColor, getOnlineStatusText, parseName } from "lib";
import { Profile } from "models/Profile";
import * as React from "react";
import errorImage from "../../layouts/App/assets/error.png";
import { ProfileDetailsDialog } from "./ProfileDetailsDialog";
import { OnlineStatus } from "lib/OnlineStatus";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardContent: {
    paddingBottom: 0,
  },
  titleArea: {
    position: "relative",
    top: -40,
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  infoButton: {
    color: theme.palette.common.white,
    margin: theme.spacing(0, 1, 0, 0),
    padding: 0,
  },
  verifiedIcon: {
    marginLeft: theme.spacing(1),
  },
  title: {
    fontWeight: "bold",
    color: theme.palette.common.white,
    paddingLeft: 10,
  },
  cardMedia: {
    borderRadius: 10,
  },
  infoNoPhoto: {
    padding: theme.spacing(0, 0, 0, 1),
  },
}));

interface Props {
  profileItem: Profile;
}

export const ProfileCard = React.memo<Props>(({ profileItem }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [showDetails, setShowDetails] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <CardMedia
              className={classes.cardMedia}
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
                  <IconButton
                    className={classes.infoButton}
                    onClick={() => setShowDetails(true)}
                  >
                    <Info />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          </CardContent>
          <CardActions>
            <Tooltip
              title={getOnlineStatusText(
                profileItem.onlineStatus as OnlineStatus,
                profileItem.lastLogin
              )}
            >
              <FiberManualRecord
                style={{
                  color: getOnlineStatusColor(
                    profileItem.onlineStatus as OnlineStatus,
                    theme
                  ),
                  margin: "0 10",
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
            {!profileItem.picture && (
              <Tooltip title="Details">
                <IconButton
                  className={classes.infoNoPhoto}
                  onClick={() => setShowDetails(true)}
                >
                  <Info />
                </IconButton>
              </Tooltip>
            )}
          </CardActions>
        </Card>
      </Grid>
      <ProfileDetailsDialog
        profileItem={profileItem}
        dialogProps={{
          open: showDetails,
          onClose: (e) => {
            setShowDetails(false);
          },
          fullWidth: true,
          maxWidth: "md",
        }}
      />
    </React.Fragment>
  );
});
