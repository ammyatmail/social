import {
  Card,
  DialogProps,
  Grid,
  Tooltip,
  ListItemText,
  CardContent,
  ListItemSecondaryAction,
  List,
  ListItem,
  ListItemIcon,
  CardActions,
  CardMedia,
  makeStyles,
  useTheme,
  Divider,
  Typography,
} from "@material-ui/core";
import {
  Person,
  FiberManualRecord,
  VerifiedUser,
  Room,
  Wc,
} from "@material-ui/icons";
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
  cardContent: {
    paddingBottom: 0,
  },
  cardActions: {
    marginLeft: theme.spacing(1.2),
  },
  cardMedia: {
    borderRadius: 10,
  },
  list: {
    maxHeight: "480px",
    overflow: "auto",
    paddingRight: theme.spacing(2),
  },
  gridContainer: {
    display: "flex",
    justifyContent: "space-evenly",
  },
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
        <Grid container className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card className={classes.card} style={{ padding: 0, margin: 0 }}>
              <CardContent className={classes.cardContent}>
                <CardMedia
                  className={classes.cardMedia}
                  component="img"
                  height="100%"
                  image={profileItem.picture?.url ?? errorImage}
                  alt={profileItem.picture?.comment}
                  style={{ padding: 0, margin: 0 }}
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
              </CardContent>
              <CardActions className={classes.cardActions}>
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
                <Typography variant="caption">
                  {getOnlineStatusText(
                    profileItem.onlineStatus as OnlineStatus,
                    profileItem.lastLogin
                  )}
                </Typography>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4}>
            <List dense className={classes.list}>
              <ListItem>
                <ListItemIcon>
                  <Person color="secondary" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    color: "secondary",
                  }}
                  primary="Personal details"
                />
              </ListItem>
              <Divider />

              <ListItem className={classes.listItem}>
                <ListItemText primary="Name" />
                <ListItemSecondaryAction>
                  <strong>{parseName(profileItem.name).join(" ")}</strong>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Age" />
                <ListItemSecondaryAction>
                  <strong>{profileDetails?.personal.age}</strong>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Body hair" />
                <ListItemSecondaryAction>
                  <strong>
                    {capitalise(
                      underscoredToWords(
                        profileDetails?.personal.bodyHair ?? ""
                      )
                    )}
                  </strong>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Body type" />
                <ListItemSecondaryAction>
                  <strong>
                    {capitalise(
                      underscoredToWords(
                        profileDetails?.personal.bodyType ?? ""
                      )
                    )}
                  </strong>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Ethnicity" />
                <ListItemSecondaryAction>
                  <strong>
                    {capitalise(profileDetails?.personal.ethnicity ?? "")}
                  </strong>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Relationship" />
                <ListItemSecondaryAction>
                  <strong>
                    {capitalise(profileDetails?.personal.relationship ?? "")}
                  </strong>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Smoker" />
                <ListItemSecondaryAction>
                  <strong>
                    {capitalise(profileDetails?.personal.smoker ?? "")}
                  </strong>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Body Shape" />
                <ListItemSecondaryAction>
                  <strong>
                    {capitalise(profileDetails?.isPlus ? "Fat" : "Slim")}
                  </strong>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Height" />
                <ListItemSecondaryAction>
                  <strong> {profileDetails?.personal.height.cm + " cm"}</strong>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Weight" />
                <ListItemSecondaryAction>
                  <strong> {profileDetails?.personal.weight.kg + " kg"}</strong>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Wc color="secondary" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    color: "secondary",
                  }}
                  primary="Sexual details"
                />
              </ListItem>
              <Divider />
              <ListItem className={classes.listItem}>
                <ListItemText primary="Anal sex position" />
                <ListItemSecondaryAction>
                  <strong>
                    {capitalise(
                      underscoredToWords(
                        profileDetails?.sexual.analPosition ?? ""
                      )
                    )}
                  </strong>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Safer sex" />
                <ListItemSecondaryAction>
                  <strong>
                    {capitalise(profileDetails?.sexual.saferSex ?? "")}
                  </strong>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="SM" />
                <ListItemSecondaryAction>
                  <strong>{capitalise(profileDetails?.sexual.sm ?? "")}</strong>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Room color="secondary" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    color: "secondary",
                  }}
                  primary="Location details"
                />
              </ListItem>
              <Divider />
              <ListItem className={classes.listItem}>
                <ListItemText primary="Area" />
                <ListItemSecondaryAction>
                  <strong>{profileDetails?.location.area}</strong>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="City" />
                <ListItemSecondaryAction>
                  <strong> {profileDetails?.location.city}</strong>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Country" />
                <ListItemSecondaryAction>
                  <strong> {profileDetails?.location.country}</strong>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Distance" />
                <ListItemSecondaryAction>
                  <strong> {profileDetails?.location.distance + " km"}</strong>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Location Name" />
                <ListItemSecondaryAction>
                  <strong> {profileDetails?.location.name}</strong>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </FormDialog>
    );
  }
);
