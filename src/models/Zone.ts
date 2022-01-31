import { Address } from "./Address";
import { Camera } from "./Camera";

export interface Zone {
  zoneId: string;
  name: string;
  accountId: number;
  address: Address;
  phone: string[];
  status: string;
  cameraIds: number[];
  cameras?: Camera[];
}
