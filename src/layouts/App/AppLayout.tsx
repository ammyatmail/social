import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Header, Sidebar } from "./components";
import { getRoutes } from "./routes";

interface Props {
  componentError?: Error;
}

const useStyles = makeStyles((theme) => ({
  main: {
    height: "100%",
    color: theme.palette.text.primary,
    [theme.breakpoints.up("lg")]: {
      marginLeft: 0,
    },
  },
  content: {
    ...theme.mixins.gutters(),
  },
  loadingWrapper: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export const AppLayout: React.FC<Props> = ({ componentError }) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const {
    breakpoints: { up },
  } = useTheme();
  const isLg = useMediaQuery(up("lg"));
  const drawerWidth = useTheme().drawerWidth;
  const routes = getRoutes();

  return (
    <React.Fragment>
      <Sidebar
        open={drawerOpen}
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
        routes={routes}
      />

      <main
        className={classes.main}
        style={{
          marginLeft: !isLg ? 0 : drawerWidth,
        }}
      >
        {routes && (
          <Switch>
            {routes.map(
              ({
                component: Component,
                render,
                headerTitle,
                ...routeProps
              }) => (
                <Route
                  {...routeProps}
                  key={routeProps.path}
                  render={(componentProps) => (
                    <React.Fragment>
                      <Header onToggleDrawer={toggleDrawer} routes={routes}>
                        {headerTitle}
                      </Header>

                      <div className={classes.content}>
                        {Component ? (
                          <Component {...componentProps} />
                        ) : render ? (
                          render(componentProps)
                        ) : null}
                      </div>
                    </React.Fragment>
                  )}
                />
              )
            )}

            <Route>
              <Redirect to="/dashboard" />
            </Route>
          </Switch>
        )}
      </main>
    </React.Fragment>
  );

  function toggleDrawer() {
    setDrawerOpen((open) => !open);
  }

  function openDrawer() {
    if (!drawerOpen) {
      toggleDrawer();
    }
  }

  function closeDrawer() {
    if (drawerOpen) {
      toggleDrawer();
    }
  }
};
