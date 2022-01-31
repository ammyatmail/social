import { Grid } from "@material-ui/core";
import { Zone } from "models/Zone";
import * as React from "react";
import { DetailsCard } from "./Pods";

interface Props {
  zone: Zone;
}

export const ZoneDashboardTab: React.FC<Props> = ({ zone }) => {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={4}>
        <DetailsCard zone={zone} />
      </Grid>
    </Grid>
  );
};
