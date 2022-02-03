import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Theme,
  useMediaQuery,
} from "@material-ui/core";
import { DialogProps } from "@material-ui/core/Dialog";
import { useTheme } from "@material-ui/core";
import * as React from "react";
import { DelayedLinearProgress } from "../DelayedLinearProgress";

const useStyles = makeStyles((theme) => ({
  invalidForm: {
    "&& input": {
      "&:invalid:not(:focus)": {
        borderBottom: `1px solid ${theme.palette.danger.main}`,
        // To overlap the border of parent element
        zIndex: 1,
      },
    },
  },
}));

export interface FormDialogProps {
  dialogProps: DialogProps;
  title?: React.ReactNode;
  cancelText?: string;
  submitText?: string;
  additionalSubmitText?: string;
  loading?: boolean;
  disableSubmitButton?: boolean;
  contentStyle?: React.CSSProperties;
  onSubmit?(e: React.FormEvent<HTMLFormElement>): void;
  additionalOnSubmit?(): void;
}

export const FormDialog: React.FC<FormDialogProps> = ({
  children,
  title = "Dialog",
  dialogProps,
  contentStyle,
  cancelText = "Cancel",
  submitText = "Save",
  additionalSubmitText,
  loading = false,
  onSubmit,
  additionalOnSubmit,
  disableSubmitButton,
}) => {
  const {
    breakpoints: { up },
  } = useTheme<Theme>();
  const classes = useStyles();
  const isDesktop = useMediaQuery(up("md"));

  // Random form name to isolate multiple forms on the same page
  const formId = React.useRef(Math.random().toString(36).substring(7));

  return (
    <Dialog fullScreen={!isDesktop} {...dialogProps}>
      <DialogTitle disableTypography={typeof title !== "string"}>
        {title}
      </DialogTitle>

      <DialogContent style={contentStyle}>
        <form
          id={formId.current}
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();

            const { currentTarget: form } = e;

            if (!form.checkValidity()) {
              form.reportValidity();

              // Find a way to use error prop some day (Available on Input & TextField) https://material-ui.com/demos/text-fields/#inputs

              form.classList.add(classes.invalidForm);
              return;
            }

            if (onSubmit) {
              onSubmit(e);
            }
          }}
          noValidate
        >
          {children}
        </form>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={(e) => {
            if (dialogProps.onClose) {
              dialogProps.onClose(e, "backdropClick");
            }
          }}
          color="default"
          disabled={loading}
        >
          {cancelText}
        </Button>

        {submitText && (
          <Button
            type="submit"
            form={formId.current}
            color="primary"
            disabled={loading || disableSubmitButton}
          >
            {submitText}
          </Button>
        )}

        {additionalSubmitText && additionalOnSubmit && (
          <Button
            onClick={() => additionalOnSubmit()}
            color="primary"
            disabled={loading || disableSubmitButton}
          >
            {additionalSubmitText}
          </Button>
        )}
      </DialogActions>

      <DelayedLinearProgress variant="query" loading={loading} />
    </Dialog>
  );
};
