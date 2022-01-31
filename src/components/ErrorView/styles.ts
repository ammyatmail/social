import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    maxWidth: 600,
    margin: '0px auto',
  },
  buttons: {
    margin: theme.spacing(2, 0),
  },
  websiteHeaderLogo: {
    height: '30px',
    margin: theme.spacing(3, 0),
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  successButton: {
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  link: {
    color: theme.palette.primary.main,
  },
}));
