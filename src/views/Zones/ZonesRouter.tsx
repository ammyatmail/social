import * as React from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import { ZoneContainer } from "./ZoneContainer";
import { ZoneDetails } from "./ZoneDetails";

export const ZonesRouter: React.FC<
  RouteComponentProps<{
    id?: string;
  }>
> = ({ match: { url, path } }) => (
  <React.Fragment>
    <Switch>
      <Route exact path={path}>
        <ZoneContainer />
      </Route>

      <Route path={`${path}/:id([0-9]+)`}>
        <ZoneDetails />
      </Route>

      <Route>
        <Redirect to={path} />
      </Route>
    </Switch>
  </React.Fragment>
);
