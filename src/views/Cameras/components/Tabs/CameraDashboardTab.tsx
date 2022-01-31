import { Grid } from "@material-ui/core";
import { Camera } from "models/Camera";
import { Device } from "models/Device";
import { Zone } from "models/Zone";
import * as React from "react";
import { CameraDetailsCard, FirmwareCard, StatusCard } from "./Pods";

interface Props {
  camera: Camera;
  zones: Zone[];
  devices: Device[];
}

export const CameraDashboardTab: React.FC<Props> = ({
  camera,
  zones,
  devices,
}) => {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={4}>
        <CameraDetailsCard camera={camera} zones={zones} devices={devices} />
        <FirmwareCard />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <StatusCard />
      </Grid>
    </Grid>
  );
};
