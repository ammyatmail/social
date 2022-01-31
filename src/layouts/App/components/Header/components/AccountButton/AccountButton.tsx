import {
  ClickAwayListener,
  Grow,
  Hidden,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@material-ui/core";
import Button, { ButtonProps } from "@material-ui/core/Button";
import { logout } from "lib";
import * as React from "react";

interface Props extends Omit<ButtonProps, "onClick"> {}

const useStyles = makeStyles((theme) => ({
  btnText: {
    marginLeft: theme.spacing(1),
  },
  popperClose: {
    pointerEvents: "none",
  },
  popperResponsive: {
    [theme.breakpoints.down("md")]: {
      ...theme.mixins.popperResponsive,
    },
  },
  dropdown: {
    ...theme.mixins.dropdown,
  },
  dropdownItem: {
    ...theme.mixins.dropdownItem,
  },
}));

export const AccountButton: React.FC<Props> = ({ ...rest }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement>();

  const open = Boolean(anchorEl);

  return (
    <React.Fragment>
      <Button onClick={handleClick} {...rest}>
        <Hidden xsDown>
          <span className={classes.btnText}>{"Account"}</span>
        </Hidden>
      </Button>

      <Popper
        placement="bottom-start"
        open={open}
        anchorEl={anchorEl}
        transition
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClick}>
            <Grow {...TransitionProps}>
              <Paper className={classes.dropdown}>
                <MenuList role="menu">
                  <MenuItem onClick={logout} className={classes.dropdownItem}>
                    Log out
                  </MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </React.Fragment>
  );

  function handleClick({
    currentTarget,
  }: React.SyntheticEvent<HTMLElement | {}>) {
    setAnchorEl(
      anchorEl || !(currentTarget instanceof Element)
        ? undefined
        : currentTarget
    );
  }
};
