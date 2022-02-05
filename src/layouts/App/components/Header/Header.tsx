import {
  AppBar,
  makeStyles,
  Button,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import { Language } from "@material-ui/icons";
import * as React from "react";
import titleImage from "../../../App/assets/r3.svg";
import { LanguageDialog } from "./components";
import { languageData } from "./components/Language/languageData";
const useStyles = makeStyles((theme) => ({
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
export const Header: React.FC = () => {
  const classes = useStyles();
  const [languageDialog, setLanguageDialog] = React.useState<boolean>(false);
  const [languageId, setLanguageId] = React.useState<number>(1);
  return (
    <React.Fragment>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <a href="/">
            <img src={titleImage} className={classes.logo} alt="title" />
          </a>
          <div className={classes.menuArea}>
            <Button color="secondary" className={classes.leftBtn}>
              News
            </Button>
            <Button color="secondary" className={classes.leftBtn}>
              About
            </Button>
            <Button color="secondary" className={classes.leftBtn}>
              Care
            </Button>
          </div>
          <IconButton
            color="secondary"
            className={classes.languageBtn}
            onClick={() => setLanguageDialog(true)}
          >
            <Language />
            {
              languageData.find((language) => language.id === languageId)
                ?.display
            }
          </IconButton>
          <Button
            color="secondary"
            variant="outlined"
            className={classes.loginBtn}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <LanguageDialog
        languageId={languageId}
        setLanguageId={setLanguageId}
        dialogProps={{
          open: languageDialog,
          onClose: (e) => {
            setLanguageDialog(false);
          },
          fullWidth: true,
          maxWidth: "sm",
        }}
      />
    </React.Fragment>
  );
};
