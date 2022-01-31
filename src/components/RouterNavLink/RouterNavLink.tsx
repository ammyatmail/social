import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

export const RouterNavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  (props, ref) => <NavLink innerRef={ref} {...props} />,
);
