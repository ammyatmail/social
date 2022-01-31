import { Button } from "@material-ui/core";
import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import logo from "layouts/App/assets/logo_small.png";
import { Login } from "views";
import { useStyles } from "./styles";

export const AuthLayout: React.FC = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.authContainer}>
          <React.Fragment>
            <div className={classes.logoContainer}>
              <img src={logo} alt="logo" style={{ width: 200 }} />
            </div>
            <div>
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route>
                  <Redirect to="/login" />
                </Route>
              </Switch>
            </div>
            <div className={classes.footerLinks}>
              <Button>Help</Button>

              <Button>Privacy</Button>

              <Button>Terms</Button>
            </div>
          </React.Fragment>
        </div>
      </div>
    </React.Fragment>
  );
};
