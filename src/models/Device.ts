import { DeviceDisplay } from "./DeviceDisplay";

export interface Device {
  addByMacMandatory: boolean;
  deviceTypeId: string;
  display: DeviceDisplay;
}
