import { Color } from '@material-ui/lab';
import * as React from 'react';
import { SharedSnackbar } from './SharedSnackbar';
import { SnackbarContext, SnackbarInputType } from './SnackbarContext';

export const SnackbarContextProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [severity, setSeverity] = React.useState<Color>('info');

  return (
    <SnackbarContext.Provider
      value={{
        open: open,
        info: info,
        success: success,
        warn: warn,
        error: error,
        close: close,
        isOpen,
        message,
        severity: severity,
      }}
    >
      <SharedSnackbar />

      {children}
    </SnackbarContext.Provider>
  );

  function open(input: SnackbarInputType, severity?: Color) {
    if (!severity) {
      severity = input instanceof Error ? 'error' : 'info';
    }

    const message = input instanceof Error ? input.message : input;

    setIsOpen(true);
    setMessage(message);
    setSeverity(severity);
  }

  function info(input: SnackbarInputType) {
    open(input, 'info');
  }

  function success(input: SnackbarInputType) {
    open(input, 'success');
  }

  function warn(input: SnackbarInputType) {
    open(input, 'warning');
  }

  function error(input: SnackbarInputType) {
    open(input, 'error');
  }

  function close() {
    setIsOpen(false);
  }
};
