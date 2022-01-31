import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  useTheme,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { RouterNavLink } from "../../../../components";
import * as React from "react";
import { AppRouteProps } from "../../routes";
import { SidebarLogo } from "./components";
import { useStyles } from "./styles";

interface Props {
  openDrawer: () => void;
  closeDrawer: () => void;
  open: boolean;

  routes?: AppRouteProps[];
  bgImage?: string;
}

export const Sidebar: React.FC<Props> = ({
  bgImage,
  routes,
  open,
  openDrawer,
  closeDrawer,
}) => {
  const {
    breakpoints: { up },
  } = useTheme();
  const isLg = useMediaQuery(up("lg"));

  const classes = useStyles();
  return (
    <SwipeableDrawer
      anchor="left"
      ModalProps={{ keepMounted: true }}
      variant={isLg ? "permanent" : "temporary"}
      open={open}
      onClose={closeDrawer}
      onOpen={openDrawer}
      disableBackdropTransition
      disableDiscovery
      classes={{ paper: classes.drawer }}
    >
      <SidebarLogo />

      <List dense className={classes.sidebarList}>
        {routes &&
          routes.map(({ path, icon: Icon, sidebarName, headerTitle }) => (
            <ListItem
              button
              onClick={closeDrawer}
              className={classes.item}
              key={path}
              component={RouterNavLink}
              to={path}
              activeClassName={classes.itemActive}
            >
              <ListItemIcon className={classes.itemIcon}>
                <Icon />
              </ListItemIcon>

              <ListItemText
                secondary={
                  typeof sidebarName === "string" ||
                  typeof sidebarName === "object"
                    ? sidebarName
                    : headerTitle
                }
                secondaryTypographyProps={{
                  className: classes.itemText,
                }}
              />
            </ListItem>
          ))}
      </List>
      <div className={classes.background} />
    </SwipeableDrawer>
  );
};
