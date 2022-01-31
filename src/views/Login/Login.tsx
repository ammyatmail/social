import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { SnackbarContext } from "components";
import Cookies from "js-cookie";
import * as React from "react";
import { useGlobalState } from "../../App.state";
import { ApiClient } from "../../ApiClient";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(0, 0.5, 2, 0.5),
  },
  cardActions: {
    justifyContent: "space-between",
  },
  cardHeader: {
    background: "none",
    textAlign: "center",
    paddingTop: theme.spacing(3),
    paddingBottom: 0,
  },
  cardHeaderTitle: {
    color: theme.palette.primary.main,
  },
}));

interface LoginInput {
  emailAddress: string;
  password: string;
  rememberMe: boolean;
}

export const Login: React.FC = () => {
  const classes = useStyles();

  const [form, setForm] = React.useState<LoginInput>(getInitialForm());
  const snackbar = React.useContext(SnackbarContext);

  const [, setAuthUser] = useGlobalState("authUser");

  return (
    <Card className={classes.card}>
      <form onSubmit={submit}>
        <CardHeader
          className={classes.cardHeader}
          title="Sign in"
          classes={{ title: classes.cardHeaderTitle }}
        />

        <CardContent>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="emailAddress"
            onChange={handleChange}
            type="email"
            autoComplete="username"
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            onChange={handleChange}
            type="password"
            autoComplete="current-password"
            required
          />

          <FormControlLabel
            control={<Checkbox name="rememberMe" onChange={handleChange} />}
            label="Remember me"
          />
        </CardContent>

        <CardActions className={classes.cardActions}>
          <Button type="button" size="medium" color="default">
            Forgot password
          </Button>

          <Button
            type="submit"
            size="medium"
            color="primary"
            variant="contained"
          >
            Login
          </Button>
        </CardActions>
      </form>
    </Card>
  );

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const { emailAddress, password, rememberMe } = form;

      if (!emailAddress || !password) {
        return;
      }

      const response = await ApiClient.login<{ accessToken: string }>(
        "/oauth/token",
        {
          username: emailAddress,
          password,
        }
      );

      if (!response) {
        return;
      }
      const token = response.accessToken;
      Cookies.set("authUser", token, {
        expires: rememberMe ? 30 : undefined,
        path: "/",
      });

      setAuthUser(token);
    } catch (error: any) {
      snackbar.error(error);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.currentTarget;

    const newVal = isCheckboxChangeEvent(e) ? e.currentTarget.checked : value;

    setForm((f) => ({ ...f, [name]: newVal }));
  }

  function getInitialForm() {
    return {
      emailAddress: "",
      password: "",
      rememberMe: false,
    };
  }
  function isCheckboxChangeEvent(
    value: any
  ): value is React.ChangeEvent<HTMLInputElement> {
    return (
      isChangeEvent(value) && value.currentTarget.hasOwnProperty("checked")
    );
  }

  function isChangeEvent(
    value: any
  ): value is React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
  > {
    return typeof value === "object" && value.hasOwnProperty("target");
  }
};
