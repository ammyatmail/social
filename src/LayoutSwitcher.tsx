import { useGlobalState } from "./App.state";
import { AppLayout, AuthLayout } from "layouts";
import * as React from "react";

export const LayoutSwitcher: React.FC = () => {
  const [authUser] = useGlobalState("authUser");

  return authUser ? <AppLayout /> : <AuthLayout />;
};
