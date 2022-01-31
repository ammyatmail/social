import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  registerContainer: {
    maxWidth: 700,
    marginTop: theme.spacing(15),
    paddingBottom: theme.spacing(5),
    paddingTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
      paddingTop: 0,
    },
  },
  authContainer: {
    maxWidth: 400,
  },
  loadingWrapper: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
  },
  logoContainer: {
    textAlign: 'center',
    margin: theme.spacing(6, 0, 2, 0),
  },
  logo: {
    height: 25,
  },
  footerLinks: {
    textAlign: 'right',
  },
}));
