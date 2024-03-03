import { renderHook, act } from '@testing-library/react-hooks';
import { useInterval, useProgress } from '../hooks';
import { INTERVAL_TIME } from '../constants';

const flushPromises = () => new Promise(setImmediate);


describe('Hooks', () => {

  describe('useProgress', () => {
    const mockData = {
      title: 'Testing promises',
    };

    it('indicates the progress of the promise', async () => {
      const promise = Promise.resolve(mockData);
      const { result } = renderHook(() => useProgress(promise));
      
      await act(() => flushPromises());

      expect(result.current.data).toEqual(mockData);
      expect(result.current.loading).toEqual(false);
      expect(result.current.error).toEqual(null);
    });

    it('maps the data when a mapper is specified', async () => {
      const mapper = (x) => ({ title: `Mapped: ${x.title}`});
      const promise = Promise.resolve(mockData);
      const { result } = renderHook(() => useProgress(promise, mapper));
      
      await act(() => flushPromises());

      expect(result.current.data).toEqual({
        title: 'Mapped: Testing promises',
      });
      expect(result.current.loading).toEqual(false);
      expect(result.current.error).toEqual(null);
    });

    it('indicates when an error has ocurred', async () => {
      const mockError = new Error('Mock error');
      const promise = Promise.reject(mockError);
      const { result } = renderHook(() => useProgress(promise));
      
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
        const refresh = jest.fn(() => Promise.resolve(mockData));
        const promise = Promise.resolve(null);
        const { result } = renderHook(() => useProgress(promise, null, refresh));
        
        
        await act(() => flushPromises());
        jest.advanceTimersByTime(INTERVAL_TIME * 2);
        await act(() => flushPromises());

        expect(result.current.data).toEqual(mockData);
        expect(result.current.loading).toEqual(false);
        expect(result.current.error).toEqual(null);
        expect(refresh).toHaveBeenCalledTimes(1);
        expect(refresh).toHaveBeenCalledWith();
      });

      it('gets does not refresh if data is initally loading', async () => {
        const refresh = jest.fn(() => Promise.resolve(mockData));
        const promise = Promise.resolve(mockData);
        const { result } = renderHook(() => useProgress(promise, null, refresh));
        
        
        jest.advanceTimersByTime(INTERVAL_TIME * 2);
        await act(() => flushPromises());

        expect(result.current.data).toEqual(mockData);
        expect(result.current.loading).toEqual(false);
        expect(result.current.error).toEqual(null);
        expect(refresh).toHaveBeenCalledTimes(0);
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