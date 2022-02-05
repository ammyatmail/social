import { alpha, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  pagination: {
    display: "flex",
    justifyContent: "center",
    paddingTop: theme.spacing(2),
  },
  toolbar: {
    justifyContent: "flex-end",
    minHeight: 0,
    padding: 0,
    marginTop: theme.spacing(1),
  },
  applicationsToolbar: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 0,
  },
  search: {
    position: "relative",
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  searchBtn: {
    marginRight: 100,
    pointerEvents: "auto",
  },
  badge: {
    padding: theme.spacing(2.5),
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(5)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  filterBtn: {
    textTransform: "none",
    color: theme.palette.common.white,
  },
  gridContainer: {
    margin: theme.spacing(0, 0, 2, 0),
    background: theme.palette.common.white,
  },
}));
