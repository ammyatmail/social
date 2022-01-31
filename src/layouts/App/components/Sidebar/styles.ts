import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles(
  ({ drawerWidth, spacing, palette: { primary, getContrastText } }) => {
    const sidebarBgColor = grey[900];

    return {
      drawer: {
        color: getContrastText(sidebarBgColor),
        width: drawerWidth + 1, // +1 because of border applied by .MuiDrawer-paperAnchorDockedLeft
      },
      background: {
        position: 'absolute',
        zIndex: 1,
        height: '100%',
        width: '100%',
        display: 'block',
        top: '0',
        left: '0',
        backgroundSize: 'cover',
        backgroundColor: sidebarBgColor,
        backgroundPosition: 'center center',
      },
      loadingWrapper: {
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
      },
      sidebarList: {
        overflow: 'auto',
        flex: 1,
        width: drawerWidth,
        height: '100%',
        zIndex: 4,
        '&::-webkit-scrollbar': {
          width: '10px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb ': {
          background: '#888',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#555',
        },
      },
      item: {
        transition: 'all 150ms linear',
        margin: spacing(1),
        padding: spacing(1, 2),
        borderRadius: 3,
        width: 'auto',
        '&:hover, &:focus': {
          color: primary.contrastText,
          backgroundColor: primary.dark,
        },
      },
      itemActive: {
        color: primary.contrastText,
        backgroundColor: primary.main,
        boxShadow: 'none',
      },
      itemIcon: {
        color: 'inherit',
      },
      itemText: {
        color: 'inherit',
      },
    };
  },
);
