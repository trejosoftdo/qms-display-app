import { useEffect, useState } from "react";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { DEFAULT_LIGHT_FONT_NAME, DEFAULT_MEDIUM_FONT_NAME, DEFAULT_REGULAR_FONT_NAME } from "../common/constants";


export type FontsResult = {
  fontsLoaded: boolean;
};

SplashScreen.preventAutoHideAsync();


/**
 * Hook used to load custom fonts
 * 
 * @returns FontsResult
 */
const useCustomFonts = (): FontsResult => {
  const [hidden, setHidden] = useState(false);
  const [fontsLoaded] = useFonts({
    [DEFAULT_REGULAR_FONT_NAME]: require('../../assets/fonts/Montserrat-Regular.ttf'),
    [DEFAULT_MEDIUM_FONT_NAME]: require('../../assets/fonts/Montserrat-Medium.ttf'),
    [DEFAULT_LIGHT_FONT_NAME]: require('../../assets/fonts/Montserrat-Light.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
        .then(() => setHidden(true));
    }
  }, [fontsLoaded]);

  
  return {
    fontsLoaded: fontsLoaded && hidden,
  };
};

export default useCustomFonts;
