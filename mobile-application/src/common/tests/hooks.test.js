import { renderHook, act } from '@testing-library/react-hooks';
import { useInterval, useProgress } from '../hooks';
import { INTERVAL_TIME } from '../constants';

const flushPromises = () => new Promise(setImmediate);


describe('Hooks', () => {
  const loadData = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('useProgress', () => {
    const mockData = {
      title: 'Testing promises',
    };

    it('indicates the progress of the promise', async () => {
      loadData.mockResolvedValue(mockData);
      const { result } = renderHook(() => useProgress(loadData));
      
      await act(() => flushPromises());

      expect(result.current.data).toEqual(mockData);
      expect(result.current.loading).toEqual(false);
      expect(result.current.error).toEqual(null);
    });

    it('maps the data when a mapper is specified', async () => {
      const mapper = (x) => ({ title: `Mapped: ${x.title}`});
      loadData.mockResolvedValue(mockData);
      const { result } = renderHook(() => useProgress(loadData, mapper));
      
      await act(() => flushPromises());

      expect(result.current.data).toEqual({
        title: 'Mapped: Testing promises',
      });
      expect(result.current.loading).toEqual(false);
      expect(result.current.error).toEqual(null);
    });

    it('indicates when an error has ocurred', async () => {
      const mockError = new Error('Mock error');
      loadData.mockRejectedValue(mockError);
      const { result } = renderHook(() => useProgress(loadData));
      
      await act(() => flushPromises());

      expect(result.current.data).toEqual(null);
      expect(result.current.loading).toEqual(false);
      expect(result.current.error).toEqual(mockError);
    });

    describe('refresh', () => {
      const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
      

      beforeEach(() => {
        jest.useFakeTimers({
          doNotFake: [
            'nextTick',
            'setImmediate',
            'clearImmediate',
            'setTimeout',
            'clearTimeout',
          ]
        });
      });

      afterAll(() => {
        jest.useRealTimers();
      });
      
      it('gets refresh at certain intervals', async () => {
        loadData.mockResolvedValue(mockData);
        const { result } = renderHook(() => useProgress(loadData, null, true));
        
        await act(() => flushPromises());
        jest.advanceTimersByTime(INTERVAL_TIME * 2);
        await act(() => flushPromises());

        expect(result.current.data).toEqual(mockData);
        expect(result.current.loading).toEqual(false);
        expect(result.current.error).toEqual(null);
        expect(loadData).toHaveBeenCalledTimes(2);
        expect(loadData).toHaveBeenCalledWith();
      });

      it('gets does not refresh if data is initally loading', async () => {
        loadData.mockResolvedValue(mockData);
        const { result } = renderHook(() => useProgress(loadData, null, true));
        
        
        jest.advanceTimersByTime(INTERVAL_TIME * 2);
        await act(() => flushPromises());

        expect(result.current.data).toEqual(mockData);
        expect(result.current.loading).toEqual(false);
        expect(result.current.error).toEqual(null);
        expect(loadData).toHaveBeenCalledTimes(1);
        expect(loadData).toHaveBeenCalledWith();
      });
    });
  });

  describe('useInterval', () => {
    beforeEach(() => {
      jest.useFakeTimers({
        doNotFake: [
          'nextTick',
          'setImmediate',
          'clearImmediate',
          'setTimeout',
          'clearTimeout',
        ]
      });
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('calls the callback at a given time interval', async () => {
      const mockCallback = jest.fn((interval) => { interval.clear(); });
      const mockDelay = 1000;
  
      renderHook(() => useInterval(mockCallback, mockDelay));
      
      jest.advanceTimersByTime(1000);
      await act(() => flushPromises());

      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it('does not calls the callback if interval time is null', async () => {
      const mockCallback = jest.fn((interval) => { interval.clear(); });
      
      renderHook(() => useInterval(mockCallback, null));
      
      jest.advanceTimersByTime(1000);
      await act(() => flushPromises());

      expect(mockCallback).toHaveBeenCalledTimes(0);
    });
  });
});