import { AppLayout } from "layouts";
import * as React from "react";

export const LayoutSwitcher: React.FC = () => {
  // here we can add check for authentication from global state and redirect to launch Login view
  return <AppLayout />;
};
