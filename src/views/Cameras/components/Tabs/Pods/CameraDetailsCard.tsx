import * as React from "react";
import {
  Card,
  CardHeader,
  Button,
  CardActions,
  makeStyles,
  Typography,
  Grid,
  CardContent,
} from "@material-ui/core";
import { Camera } from "models/Camera";
import { Zone } from "models/Zone";
import { Device } from "models/Device";
import { useApiClient } from "hooks";
import { DelayedLinearProgress } from "components";

interface Props {
  camera: Camera;
  zones: Zone[];
  devices: Device[];
}
const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(1),
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
export const CameraDetailsCard: React.FC<Props> = ({
  camera,
  zones,
  devices,
}) => {
  const classes = useStyles();
  const zone = zones.find((m) => m.zoneId === camera.zoneId)?.name;
  const deviceModel = devices.find(
    (m) => m.deviceTypeId === camera.deviceTypeId
  );

  const [{ data: locationData, loading: locationLoading }] = useApiClient<{
    timeZone: string;
  }>(`/cameras/${camera.cameraId}/location`);

  const [{ data: connectionData, loading: connectionLoading }] = useApiClient<{
    globalHost: string;
  }>(`/cameras/${camera.cameraId}/connection/details`);

  return (
    <Card className={classes.card}>
      {(locationLoading || connectionLoading) && <DelayedLinearProgress />}

      <CardHeader title={camera.name} />
      <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="caption">Zone</Typography>
            <Typography variant="body1">{zone}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography variant="caption">Type</Typography>
            <Typography variant="body1">
              {deviceModel?.display.model}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography variant="caption">Brand</Typography>
            <Typography variant="body1">
              {deviceModel?.display.brand}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography variant="caption">MAC address</Typography>
            <Typography variant="body1">{camera.ethMacAddress}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography variant="caption">IP address</Typography>
            <Typography variant="body1">
              {connectionData?.globalHost}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography variant="caption">Time zone</Typography>
            <Typography variant="body1">{locationData?.timeZone}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button color="primary">Edit</Button>
      </CardActions>
    </Card>
  );
};
