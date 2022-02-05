import { ProfileImage } from "./ProfileImage";

export interface Profile {
  id: number;
  name: string;
  onlineStatus: string;
  isPlus: boolean;
  lastLogin: string;
  picture?: ProfileImage;
}
