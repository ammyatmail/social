export interface CameraStatus {
  cameraId: string;
  online: boolean;
  recordingOnCloud: boolean;
  audioEnabled: boolean;
  passwordKnown: boolean;
  passwordStatus: string;
  connectionType: string;
  lastConnectionResult: string;
}
