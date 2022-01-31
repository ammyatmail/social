import { makeStyles } from "@material-ui/core";
import * as React from "react";
import logo from "layouts/App/assets/logo_small.png";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

const useStyles = makeStyles((theme) => ({
  logo: {
    position: "relative",
    padding: "15px 25px",
    zIndex: 4,
    margin: "20px 0px 0px 0px",
    display: "flex",
    alignItems: "center",
  },
  logoLink: {
    display: "flex",
    alignItems: "center",
    fontSize: 18,
    textDecoration: "none",
    color: "inherit",
  },
  logoImage: {
    width: 165,
    marginRight: theme.spacing(1),
  },
  logoText: {
    fontSize: 18,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

export const SidebarLogo: React.FC<Props> = ({ ...rest }) => {
  const classes = useStyles();

  return (
    <div className={classes.logo} {...rest}>
      <img src={logo} alt="logo" className={classes.logoImage} />
      <br></br>
    </div>
  );
};
