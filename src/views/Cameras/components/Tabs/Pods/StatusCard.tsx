import * as React from "react";
import {
  Card,
  CardHeader,
  makeStyles,
  Typography,
  Grid,
  CardContent,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useApiClient } from "hooks";
import { DelayedLinearProgress } from "components";
import { CameraStatus } from "models/CameraStatus";

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

interface Params {
  id: string;
}

export const StatusCard: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams<Params>();
  const [{ data: statusData, loading }] = useApiClient<CameraStatus>(
    `/cameras/${id}/status`
  );

  return (
    <Card className={classes.card}>
      {loading && <DelayedLinearProgress />}
      <CardHeader title="Status" />
      <CardContent style={{ paddingTop: 0, paddingBottom: 20 }}>
        <Grid container>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography variant="caption">Connection status</Typography>
            <Typography variant="body1">
              {statusData?.online ? "Online" : "Offline"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography variant="caption">Cloud recording</Typography>
            <Typography variant="body1">
              {statusData?.recordingOnCloud ? "On" : "Off"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography variant="caption">Audio status</Typography>
            <Typography variant="body1">
              {statusData?.audioEnabled ? "Enabled" : "Disabled"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography variant="caption">Password known</Typography>
            <Typography variant="body1">
              {statusData?.passwordKnown ? "Yes" : "No"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography variant="caption">Password status</Typography>
            <Typography variant="body1">
              {statusData?.passwordStatus}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography variant="caption">Connection type</Typography>
            <Typography variant="body1">
              {statusData?.connectionType ?? "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography variant="caption">Last connection result</Typography>
            <Typography variant="body1">
              {statusData?.lastConnectionResult}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
