import { useEffect, useState } from "react";
import { getDeviceId } from "../common/device-connection";
import { useProgress } from "../common/hooks";
import { DeviceData, Progress } from "../common/models";

/**
 * Hook to get the device identifier
 * @returns Progress<DeviceData>
 */
const useDeviceId = (): Progress<DeviceData> => useProgress<DeviceData>(() => getDeviceId().then((deviceId) => ({ deviceId })));

export default useDeviceId;
