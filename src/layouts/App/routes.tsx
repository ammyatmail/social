import { SvgIcon } from "@material-ui/core";
import { AccountTree } from "@material-ui/icons";
import DashboardIcon from "@material-ui/icons/Dashboard";
import * as React from "react";
import { RouteProps } from "react-router-dom";
import { Dashboard } from "views";
import { ProfileContainer } from "views/Profiles";

interface SubPage {
  path: string;
  headerTitle: string;
  icon: typeof SvgIcon;
  searchTitle: string;
}

// Children not supported by AppLayout
export interface AppRouteProps extends Omit<RouteProps, "children"> {
  path: string;
  headerTitle: string;
  sidebarName?: React.ReactNode;
  icon: typeof SvgIcon;
  subPages?: SubPage[];
}

export function getRoutes() {
  const routes: AppRouteProps[] = [];
  routes.push(
    {
      path: "/dashboard",
      headerTitle: "Dashboard",
      icon: DashboardIcon,
      component: Dashboard,
    },
    {
      path: "/profiles",
      headerTitle: "Profiles",
      icon: AccountTree,
      component: ProfileContainer,
    }
  );
  return routes;
}
