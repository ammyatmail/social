import { CssBaseline } from "@material-ui/core";
import { AppTheme } from "App.theme";
import { ErrorContent, SnackbarContextProvider } from "./components";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { GlobalStateProvider } from "App.state";
import { AppLayout } from "layouts/App/AppLayout";

interface Props {}

interface State {
  error?: Error;
}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  public render() {
    const { error } = this.state;

    if (error) {
      return <ErrorContent error={error} />;
    }

    return (
      <AppTheme>
        <SnackbarContextProvider>
          <GlobalStateProvider>
            <CssBaseline />

            <BrowserRouter>
              <AppLayout />
            </BrowserRouter>
          </GlobalStateProvider>
        </SnackbarContextProvider>
      </AppTheme>
    );
  }
}
