import { makeStyles, Typography } from "@material-ui/core";
import * as React from "react";
import ErrorSvg from "./error.svg";

export const useStyles = makeStyles({
  wrapper: { padding: 30, textAlign: "center" },
  image: { height: 60 },
});

export interface Props {
  error: Error;
  helpMsg?: string;
}

export const ErrorContent: React.FC<Props> = ({ error, helpMsg }) => {
  const { wrapper, image } = useStyles();

  return (
    <div className={wrapper}>
      <img src={ErrorSvg} alt="Empty" className={image} />

      <Typography color="inherit" align="center" component="div">
        <Typography color="inherit" variant="h5" gutterBottom>
          We've encountered an error.
        </Typography>

        {helpMsg && <Typography color="inherit">{helpMsg}</Typography>}
        <Typography color="inherit" component="div">
          {error.message}
        </Typography>
      </Typography>
    </div>
  );
};
