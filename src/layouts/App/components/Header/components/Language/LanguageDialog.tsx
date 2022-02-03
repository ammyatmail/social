import {
  DialogProps,
  Grid,
  Typography,
  Card,
  makeStyles,
  CardActionArea,
  useTheme,
} from "@material-ui/core";
import { FormDialog } from "components";
import * as React from "react";
import { languageData } from "./languageData";

interface Props {
  dialogProps: DialogProps;
  languageId: number;
  setLanguageId: React.Dispatch<React.SetStateAction<number>>;
}

const useStyles = makeStyles((theme) => ({
  card: { padding: theme.spacing(1.2) },
  grid: {
    maxHeight: 240,
    overflow: "auto",
    padding: theme.spacing(1.2),
  },
  table: {
    maxHeight: 300,
    overflow: "auto",
  },
}));

export const LanguageDialog: React.FC<Props> = ({
  dialogProps,
  languageId,
  setLanguageId,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <FormDialog
      title="Language"
      submitText=""
      onSubmit={() => {}}
      dialogProps={dialogProps}
      loading={false}
      cancelText="Close"
    >
      <Grid container>
        {languageData.map((m, index) => (
          <Grid
            item
            xs={6}
            md={3}
            className={classes.grid}
            key={m.id.toString()}
          >
            <Card
              className={classes.card}
              style={{
                color: m.id === languageId ? theme.palette.secondary.main : "",
              }}
            >
              <CardActionArea
                onClick={(e) => {
                  apply(m.id, e);
                }}
              >
                <Typography variant="subtitle1">{m.display}</Typography>
                <Typography variant="caption">{m.country} </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </FormDialog>
  );
  function apply(
    val: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    setLanguageId(val);
    dialogProps.onClose && dialogProps.onClose(e, "backdropClick");
  }
};
