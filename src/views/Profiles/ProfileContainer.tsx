import {
  Grid,
  Toolbar,
  AppBar,
  Button,
  Badge,
  IconButton,
  Collapse,
  InputBase,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import { DelayedLinearProgress, SnackbarContext } from "components";
import { useApiClient } from "hooks";
import * as React from "react";
import { MasterProfileList } from "models/MasterProfileList";
import { Pagination } from "@material-ui/lab";
import { ProfileCard } from "./ProfileCard";
import { Close, FilterList, Search } from "@material-ui/icons";
import { useStyles } from "./styles";

interface Filter {
  single: boolean;
  smoke: boolean;
  online: boolean;
}
export const ProfileContainer: React.FC = () => {
  const classes = useStyles();
  const perPageDataLength = 20;
  const [pageNumber, setPage] = React.useState<number>(1);
  const [filter, setFilter] = React.useState<Filter>({
    smoke: false,
    single: false,
    online: false,
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const [{ data: dataProfiles, loading: profileLoading, error: errorProfile }] =
    useApiClient<MasterProfileList>(
      `/api/search?length=${pageNumber * perPageDataLength}`
    );

  const totalPages = dataProfiles?.total
    ? Math.ceil(dataProfiles?.total / perPageDataLength)
    : 1;

  const getPaginationData = React.useCallback(
    function getPaginationData() {
      return (
        dataProfiles?.items.slice((pageNumber - 1) * perPageDataLength) ?? []
      );
    },
    [dataProfiles?.items, pageNumber]
  );

  const snackbar = React.useContext(SnackbarContext);

  React.useEffect(() => {
    if (errorProfile) {
      snackbar.error(errorProfile);
    }
  }, [errorProfile, snackbar]);
  const [searchText, setSearchText] = React.useState<string>("");
  const [filtersOpen, setFiltersOpen] = React.useState(false);

  return (
    <React.Fragment>
      <DelayedLinearProgress loading={profileLoading} />
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar className={classes.applicationsToolbar}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <IconButton
                className={classes.searchBtn}
                onClick={() => {
                  if (searchText && searchText.length !== 0) {
                    setSearchText("");
                  }
                }}
              >
                {searchText && searchText.length !== 0 ? <Close /> : <Search />}
              </IconButton>
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              fullWidth
              value={searchText}
              autoFocus
              onChange={(e) => {
                setSearchText((e.target.value as string).toLowerCase());
              }}
            />
          </div>
          <div className={classes.badge}>
            <Badge badgeContent={getFilterCount()} color="primary">
              <Button
                className={classes.filterBtn}
                startIcon={<FilterList />}
                onClick={() => {
                  setFiltersOpen(!filtersOpen);
                }}
              >
                Filter
              </Button>
            </Badge>
          </div>
        </Toolbar>
      </AppBar>
      <Collapse in={filtersOpen}>
        <Grid container className={classes.gridContainer}>
          <Grid item xs={12} sm={3} md={2} lg={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={filter?.online}
                  onChange={(e) => {
                    setFilter((curr) => ({
                      ...curr,
                      online: e.target.checked,
                    }));
                  }}
                />
              }
              label="Online status"
            />
          </Grid>
          <Grid item xs={12} sm={3} md={2} lg={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={filter?.single}
                  onChange={(e) => {
                    setFilter((curr) => ({
                      ...curr,
                      single: e.target.checked,
                    }));
                  }}
                />
              }
              label="Single"
            />
          </Grid>
          <Grid item xs={12} sm={3} md={2} lg={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={filter?.smoke}
                  onChange={(e) => {
                    setFilter((curr) => ({
                      ...curr,
                      smoke: e.target.checked,
                    }));
                  }}
                />
              }
              label="Smoker"
            />
          </Grid>
        </Grid>
      </Collapse>
      <Grid container>
        {getPaginationData().map((item, index) => (
          <ProfileCard profileItem={item} key={index.toString()} />
        ))}
      </Grid>
      <div className={classes.pagination}>
        <Pagination
          count={totalPages}
          color="primary"
          onChange={handleChange}
          showFirstButton
          showLastButton
        />
      </div>
    </React.Fragment>
  );
  function getFilterCount() {
    return Object.values(filter).filter((k) => {
      if (!k) {
        return false;
      } else {
        return true;
      }
    }).length;
  }
};
