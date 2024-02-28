import { useProgress } from "../../common/hooks";
import { loadServices } from "../../common/services/service";
import useServices from "../useServices";

jest.mock('../../common/hooks');
jest.mock('../../common/services/service');

describe('useServices hook', () => {
  const mockCategoryId = 'test-category-id';
  const mockServices = [{
    id: 'test-id',
    name: 'test-name',
  }];

  beforeEach(() => {
    loadServices.mockResolvedValue(mockServices);
    useProgress.mockImplementation(async (promise) => ({
      loading: false,
      error: null,
      data: await promise,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('loads the services as expected', async () => {
    const result = await useServices(mockCategoryId);
    expect(result).toEqual({
      loading: false,
      error: null,
      data: mockServices,
    });
    expect(loadServices).toHaveBeenCalledTimes(1);
    expect(loadServices).toHaveBeenCalledWith(mockCategoryId);
    expect(useProgress).toHaveBeenCalledTimes(1);
    expect(useProgress).toHaveBeenCalledWith(expect.any(Promise));
  });
});