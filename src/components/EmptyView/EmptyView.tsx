import { makeStyles, Typography } from "@material-ui/core";
import * as React from "react";
import EmptySvg from "./empty.svg";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  hideImage?: boolean;
}

const useStyles = makeStyles({
  wrapper: {
    width: "100%",
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 30,
  },
  image: {
    height: 60,
  },
  text: {
    textAlign: "center",
  },
});

export const EmptyView: React.FC<Props> = ({
  hideImage = false,
  children = "Nothing here yet.",
  className,
  ...rest
}) => {
  const { text, image, wrapper } = useStyles();

  return (
    <div {...rest} className={wrapper}>
      {!hideImage && <img src={EmptySvg} alt="Empty" className={image} />}

      <Typography
        className={text}
        component={typeof children === "string" ? "p" : "div"}
      >
        {children}
      </Typography>
    </div>
  );
};
