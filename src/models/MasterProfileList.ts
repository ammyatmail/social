import { Picture } from "./Picture";
import { Profile } from "./Profile";

export interface MasterProfileList {
  cursors: { after: string };
  items: Profile[];
  total: number;
}
