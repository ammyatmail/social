import { Fade, LinearProgress } from '@material-ui/core';
import { LinearProgressProps } from '@material-ui/core/LinearProgress';
import { useTheme } from '@material-ui/core';
import * as React from 'react';

interface Props extends LinearProgressProps {
  loading?: boolean;
}

// https://www.nngroup.com/articles/response-times-3-important-limits/
export const DelayedLinearProgress: React.FC<Props> = ({
  loading = true,
  ...props
}) => {
  const { loadingDelay } = useTheme();

  return (
    <Fade style={{ transitionDelay: loadingDelay }} in={loading}>
      <LinearProgress {...props} />
    </Fade>
  );
};
