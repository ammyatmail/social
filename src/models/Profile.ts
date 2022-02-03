import { Picture } from "./Picture";

export interface Profile {
  id: number;
  name: string;
  onlineStatus: string;
  isPlus: boolean;
  city?: string;
  lastLogin: Date;
  picture: Picture;
}
