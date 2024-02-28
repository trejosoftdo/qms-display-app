import { renderHook, act } from '@testing-library/react-hooks';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  DEFAULT_LIGHT_FONT_NAME,
  DEFAULT_MEDIUM_FONT_NAME,
  DEFAULT_REGULAR_FONT_NAME
} from '../../common/constants';
import useCustomFonts from "../useCustomFonts";


jest.mock('expo-font');
jest.mock('expo-splash-screen');

const flushPromises = () => new Promise(setImmediate);

describe('useCustomFonts hook', () => {
  const fontsLoaded = true;

  beforeEach(() => {
    useFonts.mockReturnValue([fontsLoaded]);
    SplashScreen.hideAsync.mockResolvedValue(null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('it loads the fonts hiding the splash when finished', async () => {
    const { result } = renderHook(() => useCustomFonts());
      
    await act(() => flushPromises());

    expect(result.current.fontsLoaded).toEqual(true);
    expect(useFonts).toHaveBeenCalledTimes(2);
    expect(useFonts).toHaveBeenCalledWith({
      [DEFAULT_REGULAR_FONT_NAME]: 1,
      [DEFAULT_MEDIUM_FONT_NAME]: 1,
      [DEFAULT_LIGHT_FONT_NAME]: 1,  
    });
    expect(SplashScreen.hideAsync).toHaveBeenCalledTimes(1);
    expect(SplashScreen.hideAsync).toHaveBeenCalledWith();
  });

  it('it does not hide the splash if the fonts have not been loaded', async () => {
    useFonts.mockReturnValue([false]);

    const { result } = renderHook(() => useCustomFonts());
      
    await act(() => flushPromises());

    expect(result.current.fontsLoaded).toEqual(false);
    expect(useFonts).toHaveBeenCalledTimes(1);
    expect(useFonts).toHaveBeenCalledWith({
      [DEFAULT_REGULAR_FONT_NAME]: 1,
      [DEFAULT_MEDIUM_FONT_NAME]: 1,
      [DEFAULT_LIGHT_FONT_NAME]: 1,  
    });
    expect(SplashScreen.hideAsync).toHaveBeenCalledTimes(0);
  });
});