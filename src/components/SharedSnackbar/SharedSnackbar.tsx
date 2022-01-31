import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import * as React from 'react';
import { SnackbarContext } from './SnackbarContext';

export const SharedSnackbar: React.FC = () => {
  const { isOpen, message, severity, close } = React.useContext(
    SnackbarContext,
  );

  return (
    <Snackbar
      open={isOpen}
      onClose={close}
      autoHideDuration={6000}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <Alert severity={severity} variant="filled" onClose={close}>
        {message.split(/\n/).map((t, i, arr) => (
          <React.Fragment key={`error-${i}`}>
            {t}
            {arr.length > 1 && <br />}
          </React.Fragment>
        ))}
      </Alert>
    </Snackbar>
  );
};
