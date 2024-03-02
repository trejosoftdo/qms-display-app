import { useProgress } from "../../common/hooks";
import { loadTurnsStatusTable } from "../../common/services/service-turn";
import useTurnsStatusTable from "../useTurnsStatusTable";

jest.mock('../../common/hooks');
jest.mock('../../common/services/service-turn');

describe('useTurnsStatusTable hook', () => {
  const mockData = {
    items: [{
      id: 'test-id',
      name: 'test-name',
    }],
  };

  beforeEach(() => {
    loadTurnsStatusTable.mockResolvedValue(mockData);
    useProgress.mockImplementation(async (promise) => ({
      loading: false,
      error: null,
      data: await promise,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('loads the Items as expected', async () => {
    const result = await useTurnsStatusTable();
    expect(result).toEqual({
      loading: false,
      error: null,
      data: mockData,
    });
    expect(loadTurnsStatusTable).toHaveBeenCalledTimes(1);
    expect(loadTurnsStatusTable).toHaveBeenCalledWith();
    expect(useProgress).toHaveBeenCalledTimes(1);
    expect(useProgress).toHaveBeenCalledWith(
      expect.any(Promise),
      null,
      expect.any(Function),
    );
  });
});