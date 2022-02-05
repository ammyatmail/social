import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  toolbar: {
    height: 75,
    padding: theme.spacing(0, 5),
    justifyContent: "space-between",
  },
  logo: {
    height: 40,
  },
  appBar: {
    zIndex: 1,
    backgroundColor: theme.palette.common.black,
  },
  menuArea: {
    display: "flex",
    flexGrow: 1,
    paddingLeft: "inherit",
  },
  leftBtn: {
    fontSize: 20,
  },
  loginBtn: {
    fontSize: 15,
    textTransform: "none",
  },
  languageBtn: {
    fontSize: 15,
    paddingRight: "inherit",
  },
}));
