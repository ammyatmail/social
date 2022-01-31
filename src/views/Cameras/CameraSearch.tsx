import * as React from "react";
import {
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  makeStyles,
  TextField,
  Button,
  Card,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { ConnectionStatus, SearchParam } from "./CameraContainer";

interface Props {
  setVariables: React.Dispatch<React.SetStateAction<SearchParam>>;
  variables: SearchParam;
}

const useStyles = makeStyles((theme) => ({
  marginBottom: {
    margin: theme.spacing(0, 0, 2, 0),
  },
}));

export const CameraSearch: React.FC<Props> = ({ setVariables, variables }) => {
  const classes = useStyles();

  const connectionStatuses = [
    ConnectionStatus.ONLINE,
    ConnectionStatus.OFFLINE,
  ];
  return (
    <Card>
      <CardHeader title="Quick filter" />
      <CardContent>
        <FormControl fullWidth className={classes.marginBottom}>
          <TextField
            autoFocus
            value={variables.searchText ?? ""}
            onChange={(e) =>
              setVariables((f) => ({
                ...f,
                searchText: e.target.value || null,
              }))
            }
            label="Camera search"
            placeholder="Search by name or mac address"
          />
        </FormControl>
        <Autocomplete
          value={variables.connectionStatus}
          options={connectionStatuses}
          getOptionLabel={(l) => l}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Connection status"
              placeholder="Select connection status"
              fullWidth
              margin="normal"
            />
          )}
          onChange={(e, status) => {
            setVariables((f) => ({
              ...f,
              connectionStatus: status,
            }));
          }}
        />
      </CardContent>
      <CardActions>
        <Button onClick={resetQuickSearch}>Reset</Button>
      </CardActions>
    </Card>
  );

  function resetQuickSearch() {
    setVariables((f) => ({
      ...f,
      connectionStatus: null,
      searchText: null,
    }));
  }
};
