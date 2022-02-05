import { Theme } from "@material-ui/core";
import { formatDistanceToNow, parseISO } from "date-fns";
import { OnlineStatus } from "./OnlineStatus";

/**
 * Turns "myPascalCase" to "My Pascal Case"
 * @param input The string in pascal case
 */
export function pascalToWords(input: string): string {
  return (
    input
      // Split when an upper case letter follows a lower case letter
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      // Set first letter of input to upper case
      .replace(/^./, (c) => c.toUpperCase())
  );
}

/**
 * Turns "my_underscored_words" to "My Underscored Words"
 * @param input The string in underscored format
 */
export function underscoredToWords(input: string): string {
  const frags = input.split("_");
  for (let i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(" ");
}

/**
 * Capitalises strings
 * @param input the string to capitalise
 * @param eachWord flag to capitalize each word in string
 */
export function capitalise(input: string, eachWord?: boolean): string {
  const lowercase = input.toLowerCase();

  if (eachWord) {
    return lowercase
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  return lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
}

export function getOnlineStatusColor(val: OnlineStatus, theme: Theme) {
  switch (val) {
    case OnlineStatus.ONLINE:
      return theme.palette.success.main.toString();
    case OnlineStatus.OFFLINE:
      return theme.palette.error.main.toString();
    case OnlineStatus.DATE:
      return theme.palette.warning.main.toString();
    default:
      return theme.palette.success.main.toString();
  }
}

export function getOnlineStatusText(val: OnlineStatus, lastDate: Date) {
  const time = formatDistanceToNow(parseISO(lastDate.toString()), {
    addSuffix: true,
  });
  switch (val) {
    case OnlineStatus.ONLINE:
      return "Online";
    case OnlineStatus.OFFLINE:
      return "Offline, last login time: " + time;
    case OnlineStatus.DATE:
      return "Away, last login time: " + time;
    default:
      return "Online";
  }
}
