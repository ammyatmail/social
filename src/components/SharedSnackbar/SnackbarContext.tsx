import { Color } from '@material-ui/lab';
import * as React from 'react';

export type SnackbarInputType = Error | string;

export interface Snackbar {
  open: (input: SnackbarInputType, severity?: Color) => void;
  info: (input: SnackbarInputType) => void;
  success: (input: SnackbarInputType) => void;
  warn: (input: SnackbarInputType) => void;
  error: (input: SnackbarInputType) => void;
  close: () => void;
  isOpen: boolean;
  message: string;
  severity: Color;
}

export const SnackbarContext = React.createContext<Snackbar>({
  isOpen: false,
  message: '',
  severity: 'info',

  close() {},
  open() {},
  info() {},
  success() {},
  error() {},
  warn() {},
});
