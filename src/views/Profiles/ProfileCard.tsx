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
  infoButton: {
    color: "#fff",
    margin: theme.spacing(0, 1, 0, 0),
    padding: 0,
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
  const [showDetails, setShowDetails] = React.useState<boolean>(false);

  return (
    <React.Fragment>
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
                    profileItem.onlineStatus as OnlineStatus,
                    theme
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
