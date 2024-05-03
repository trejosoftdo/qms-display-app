import { renderHook, act } from '@testing-library/react-hooks';
import { loadMultipleAudio } from "../../common/services/service-turn";
import useTurnsMessageCalls from "../useTurnsMessageCalls";


jest.mock('../../common/services/service-turn');

const flushPromises = () => new Promise(setImmediate);

describe('useTurnsMessageCalls hook', () => {
  const mockTextItems = ['first', 'second'];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('it loads the audio items when available', async () => {
    renderHook(() => useTurnsMessageCalls(mockTextItems));
      
    await act(() => flushPromises());

    expect(loadMultipleAudio).toHaveBeenCalledTimes(1);
    expect(loadMultipleAudio).toHaveBeenCalledWith(mockTextItems);
  });

  it('it does not load the audio items when not available', async () => {
    renderHook(() => useTurnsMessageCalls([]));
      
    await act(() => flushPromises());

    expect(loadMultipleAudio).toHaveBeenCalledTimes(0);
  });
});