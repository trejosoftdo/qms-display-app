import { useProgress } from "../../common/hooks";
import { loadCategories } from "../../common/services/category";
import useCategories from "../useCategories";

jest.mock('../../common/hooks');
jest.mock('../../common/services/category');

describe('useCategories hook', () => {
  const mockCategories = [{
    id: 'test-id',
    name: 'test-name',
  }];

  beforeEach(() => {
    loadCategories.mockResolvedValue(mockCategories);
    useProgress.mockImplementation(async (promise) => ({
      loading: false,
      error: null,
      data: await promise,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('loads the categories as expected', async () => {
    const result = await useCategories();
    expect(result).toEqual({
      loading: false,
      error: null,
      data: mockCategories,
    });
    expect(loadCategories).toHaveBeenCalledTimes(1);
    expect(loadCategories).toHaveBeenCalledWith();
    expect(useProgress).toHaveBeenCalledTimes(1);
    expect(useProgress).toHaveBeenCalledWith(expect.any(Promise));
  });
});