import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  ({ palette, breakpoints: { down }, spacing }) => ({
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: palette.background.default,
      },
    },
    selectRootResponsive: {
      [down('sm')]: {
        marginRight: spacing(2),
      },
    },
    actionsResponsive: {
      [down('sm')]: {
        marginLeft: spacing(2),
      },
    },
    btnRootResponsive: {
      [down('sm')]: {
        padding: spacing(3, 1.5),
      },
    },
  }),
);
