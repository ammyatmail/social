import * as React from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import { CameraContainer } from "./CameraContainer";
import { CameraDetails } from "./CameraDetails";

export const CamerasRouter: React.FC<
  RouteComponentProps<{
    id?: string;
  }>
> = ({ match: { url, path } }) => (
  <React.Fragment>
    <Switch>
      <Route exact path={path}>
        <CameraContainer />
      </Route>

      <Route path={`${path}/:id([0-9]+)`}>{<CameraDetails />}</Route>

      <Route>
        <Redirect to={path} />
      </Route>
    </Switch>
  </React.Fragment>
);
