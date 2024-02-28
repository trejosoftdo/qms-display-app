import { useProgress } from "../../common/hooks";
import { getDeviceId } from "../../common/device-connection";
import useDeviceId from "../useDeviceId";

jest.mock('../../common/hooks');
jest.mock('../../common/device-connection');

describe('useDeviceId hook', () => {
  const mockDeviceId = 'test-device-id';

  beforeEach(() => {
    getDeviceId.mockResolvedValue(mockDeviceId);
    useProgress.mockImplementation(async (promise) => ({
      loading: false,
      error: null,
      data: await promise,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('loads the device id as expected', async () => {
    const result = await useDeviceId();
    expect(result).toEqual({
      loading: false,
      error: null,
      data: { deviceId: mockDeviceId },
    });
    expect(getDeviceId).toHaveBeenCalledTimes(1);
    expect(getDeviceId).toHaveBeenCalledWith();
    expect(useProgress).toHaveBeenCalledTimes(1);
    expect(useProgress).toHaveBeenCalledWith(expect.any(Promise));
  });
});