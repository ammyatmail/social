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
import { CameraFirmware } from "models/CameraFirmware";

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

export const FirmwareCard: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams<Params>();
  const [{ data, loading }] = useApiClient<CameraFirmware>(
    `/cameras/${id}/firmware`
  );

  return (
    <Card className={classes.card}>
      {loading && <DelayedLinearProgress />}
      <CardHeader title="Firmware" />
      <CardContent style={{ paddingTop: 0, paddingBottom: 20 }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="caption">Current version</Typography>
            <Typography variant="body1">
              {data?.currentVersion + " (" + data?.status + ")"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption">Target version</Typography>
            <Typography variant="body1">{data?.targetVersion}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
