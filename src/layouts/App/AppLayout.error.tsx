import * as React from 'react';
import { AppLayout } from './AppLayout';

interface Props {}

interface State {
  error?: Error;
}

export class AppLayoutError extends React.Component<Props, State> {
  /**
   * https://reactjs.org/docs/hooks-faq.html#how-do-lifecycle-methods-correspond-to-hooks
   *
   * componentDidCatch and getDerivedStateFromError: There are no Hook equivalents for these methods yet, but they will be added soon.
   */
  public static getDerivedStateFromError(error: Error) {
    return { error };
  }

  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  public render() {
    const { error } = this.state;

    return <AppLayout componentError={error} />;
  }
}
