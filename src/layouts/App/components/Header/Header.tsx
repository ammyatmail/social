import {
  AppBar,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import * as React from "react";
import { AppRouteProps } from "../../routes";
import { AccountButton } from "./components";
import { useStyles } from "./styles";

interface Props {
  onToggleDrawer?: React.MouseEventHandler<HTMLElement>;
  routes?: AppRouteProps[];
}

export const Header: React.FC<Props> = ({
  onToggleDrawer,
  children,
  routes,
}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Hidden lgUp>
            <IconButton
              color="inherit"
              className={classes.menuButton}
              onClick={onToggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>

          <div className={classes.title}>
            <Typography variant="h6" color="inherit">
              {children}
            </Typography>
          </div>

          <AccountButton color="inherit" />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
