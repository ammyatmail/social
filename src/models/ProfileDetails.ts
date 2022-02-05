import { Location } from "./Location";
import { Personal } from "./Personal";
import { Sexual } from "./Sexual";

export interface ProfileDetails {
  id: number;
  headline: string;
  isPlus: boolean;
  location: Location;
  personal: Personal;
  sexual: Sexual;
}
