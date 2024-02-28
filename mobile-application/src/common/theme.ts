
import { configureFonts, MD3LightTheme } from 'react-native-paper';
import { DEFAULT_LIGHT_FONT_NAME, DEFAULT_MEDIUM_FONT_NAME, DEFAULT_REGULAR_FONT_NAME, NORMAL_FONT_WEIGHT } from './constants';


const commonFontConfig = {
  default: {
    fontFamily: DEFAULT_REGULAR_FONT_NAME,
    fontWeight: NORMAL_FONT_WEIGHT,
  },    
  regular: {
    fontFamily: DEFAULT_REGULAR_FONT_NAME,
    fontWeight: NORMAL_FONT_WEIGHT,
  },
  medium: {
    fontFamily: DEFAULT_MEDIUM_FONT_NAME,
    fontWeight: NORMAL_FONT_WEIGHT,
  },
  light: {
    fontFamily: DEFAULT_LIGHT_FONT_NAME,
    fontWeight: NORMAL_FONT_WEIGHT,
  },
  thin: {
    fontFamily: DEFAULT_LIGHT_FONT_NAME,
    fontWeight: NORMAL_FONT_WEIGHT,
  },
  titleMedium: {
    fontFamily: DEFAULT_REGULAR_FONT_NAME,
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  titleSmall: {
    fontFamily: DEFAULT_REGULAR_FONT_NAME,
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  titleLarge: {
    fontFamily: DEFAULT_REGULAR_FONT_NAME,
    fontSize: 22,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 28,
  },
  headlineSmall: {
    fontFamily: DEFAULT_REGULAR_FONT_NAME,
    fontSize: 24,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 32,
  },
  headlineMedium: {
    fontFamily: DEFAULT_REGULAR_FONT_NAME,
    fontSize: 28,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 36,
  },
  headlineLarge: {
    fontFamily: DEFAULT_REGULAR_FONT_NAME,
    fontSize: 32,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 40,
  },
  labelSmall: {
    fontFamily: DEFAULT_REGULAR_FONT_NAME,
    fontSize: 11,
    fontWeight: "500",
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  labelMedium: {
    fontFamily: DEFAULT_REGULAR_FONT_NAME,
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  labelLarge: {
    fontFamily: DEFAULT_REGULAR_FONT_NAME,
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: DEFAULT_REGULAR_FONT_NAME,
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 0.4,
    lineHeight: 16,
  },
  bodyMedium: {
    fontFamily: DEFAULT_REGULAR_FONT_NAME,
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 0.25,
    lineHeight: 20,
  },
  bodyLarge: {
    fontFamily: DEFAULT_REGULAR_FONT_NAME,
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: 0.15,
    lineHeight: 24,
  },
};

const fontConfig = {
  web: commonFontConfig,
  ios: commonFontConfig,
  android: commonFontConfig,
};

const AppLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2929cc',
    primaryContainer: '#b4c5e4',
    background: '#ffffff',
    outline: '#d4d4d4',
    error: '#cc426a',
    tertiaryContainer: '#feeef4',
    secondary: '#3c3744',
  },
  // @ts-ignore
  fonts: configureFonts({ config: fontConfig, isV3: false }),
};

export default AppLightTheme;
