import {
  Card,
  DialogProps,
  Grid,
  Tooltip,
  ListItemText,
  ListItemSecondaryAction,
  List,
  ListItem,
  CardActions,
  CardMedia,
  makeStyles,
  useTheme,
  Divider,
  Typography,
} from "@material-ui/core";
import { FiberManualRecord, VerifiedUser } from "@material-ui/icons";
import { Profile } from "models/Profile";
import * as React from "react";
import errorImage from "../../layouts/App/assets/error.png";
import { FormDialog, SnackbarContext } from "components";
import { useApiClient } from "hooks";
import { ProfileDetails } from "models/ProfileDetails";
import {
  capitalise,
  parseName,
  underscoredToWords,
  getOnlineStatusText,
  getOnlineStatusColor,
} from "lib";
import { OnlineStatus } from "lib/OnlineStatus";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: 0,
    padding: 0,
  },
  titleArea: {
    position: "relative",
    top: -40,
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  verifiedIcon: {
    marginLeft: theme.spacing(1),
  },
  listItem: { paddingTop: 0, paddingBottom: 0 },
}));

interface Props {
  profileItem: Profile;
  dialogProps: DialogProps;
}

export const ProfileDetailsDialog = React.memo<Props>(
  ({ profileItem, dialogProps }) => {
    const classes = useStyles();
    const theme = useTheme();
    const snackbar = React.useContext(SnackbarContext);

    const [{ data, loading, error }] = useApiClient<ProfileDetails[]>(
      `/api/profiles?ids=${profileItem.id}`
    );
    const profileDetails = data && data?.length > 0 ? data[0] : undefined;
    React.useEffect(() => {
      if (error) {
        snackbar.error(error);
      }
    }, [error, snackbar]);

    return (
      <FormDialog
        title="Details"
        submitText="Close"
        onSubmit={(e) => {
          dialogProps.onClose && dialogProps.onClose(e, "backdropClick");
        }}
        dialogProps={dialogProps}
        loading={loading}
        cancelText=""
      >
        <Grid
          container
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card className={classes.card}>
              <CardMedia
                component="img"
                height="100%"
                image={profileItem.picture?.url ?? errorImage}
                alt={profileItem.picture?.comment}
              />
              {profileItem.picture && (
                <div className={classes.titleArea}>
                  <div style={{ display: "flex" }}>
                    <Tooltip title="Verified">
                      <VerifiedUser
                        color="primary"
                        className={classes.verifiedIcon}
                      />
                    </Tooltip>
                  </div>
                </div>
              )}
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
                <Typography>
                  {getOnlineStatusText(
                    profileItem.onlineStatus as OnlineStatus,
                    profileItem.lastLogin
                  )}
                </Typography>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4}>
            <List dense>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Name" />
                <ListItemSecondaryAction>
                  {parseName(profileItem.name).join(" ")}
                </ListItemSecondaryAction>
              </ListItem>

              <Divider />
              <ListItem className={classes.listItem}>
                <ListItemText primary="Age" />
                <ListItemSecondaryAction>
                  {profileDetails?.personal.age}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Body hair" />
                <ListItemSecondaryAction>
                  {capitalise(profileDetails?.personal.bodyHair ?? "")}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Body type" />
                <ListItemSecondaryAction>
                  {capitalise(profileDetails?.personal.bodyType ?? "")}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Ethnicity" />
                <ListItemSecondaryAction>
                  {capitalise(profileDetails?.personal.ethnicity ?? "")}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Relationship" />
                <ListItemSecondaryAction>
                  {capitalise(profileDetails?.personal.relationship ?? "")}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Smoker" />
                <ListItemSecondaryAction>
                  {capitalise(profileDetails?.personal.smoker ?? "")}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Body Shape" />
                <ListItemSecondaryAction>
                  {capitalise(profileDetails?.isPlus ? "Fat" : "Slim")}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Height" />
                <ListItemSecondaryAction>
                  {profileDetails?.personal.height.cm + " cm"}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Weight" />
                <ListItemSecondaryAction>
                  {profileDetails?.personal.weight.kg + " kg"}
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem className={classes.listItem}>
                <ListItemText primary="Anal sex position" />
                <ListItemSecondaryAction>
                  {capitalise(
                    underscoredToWords(
                      profileDetails?.sexual.analPosition ?? ""
                    )
                  )}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Safer sex" />
                <ListItemSecondaryAction>
                  {capitalise(profileDetails?.sexual.saferSex ?? "")}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="SM" />
                <ListItemSecondaryAction>
                  {capitalise(profileDetails?.sexual.sm ?? "")}
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem className={classes.listItem}>
                <ListItemText primary="Area" />
                <ListItemSecondaryAction>
                  {profileDetails?.location.area}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="City" />
                <ListItemSecondaryAction>
                  {profileDetails?.location.city}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Country" />
                <ListItemSecondaryAction>
                  {profileDetails?.location.country}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Distance" />
                <ListItemSecondaryAction>
                  {profileDetails?.location.distance + " km"}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Location Name" />
                <ListItemSecondaryAction>
                  {profileDetails?.location.name}
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </FormDialog>
    );
  }
);
