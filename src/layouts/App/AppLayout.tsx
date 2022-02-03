import { makeStyles } from "@material-ui/core";
import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Header } from "./components";
import { getRoutes } from "./routes";

interface Props {
  componentError?: Error;
}

const useStyles = makeStyles((theme) => ({
  main: {
    height: "100%",
    padding: theme.spacing(2),
    background: theme.palette.common.black,
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
  const routes = getRoutes();

  return (
    <React.Fragment>
      <Header />
      <main className={classes.main}>
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
};
