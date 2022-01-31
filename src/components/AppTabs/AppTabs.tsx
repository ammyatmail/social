import {
  AppBar,
  makeStyles,
  Tab as TabComponent,
  Tabs,
  TabsProps,
} from '@material-ui/core';
import * as React from 'react';
import { useLocation } from 'react-router';

interface Tab<T extends string> {
  label: string;
  value: T;
}

interface Props<T extends string> extends Omit<TabsProps, 'value'> {
  tabs: Tab<T>[];
  defaultTab?: T;

  children(activeTab: T): React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: theme.spacing(2),
  },
}));

export function AppTabs<T extends string>({
  tabs,
  defaultTab,
  children,
  ...tabsProps
}: Props<T>) {
  const classes = useStyles();
  const { hash } = useLocation();
  const activeTab = getTabForHash(hash);

  return (
    <React.Fragment>
      <AppBar
        position="static"
        color="default"
        elevation={1}
        className={classes.appBar}
      >
        <Tabs
          value={activeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          {...tabsProps}
        >
          {tabs.map(({ label, value }) => (
            <TabComponent
              label={label}
              value={value}
              href={`#${value}`}
              key={value}
            />
          ))}
        </Tabs>
      </AppBar>

      {children(activeTab)}
    </React.Fragment>
  );

  function getTabForHash(hash: string): T {
    hash = hash.replace('#', '');

    if (isTab(hash)) {
      return hash;
    }

    if (defaultTab) {
      return defaultTab;
    }

    if (tabs.length > 0) {
      return tabs[0].value;
    }

    throw new Error(`Unknown tab for hash ${hash}`);
  }

  function isTab(tab: string): tab is T {
    return tabs.some(({ value }) => value === tab);
  }
}
