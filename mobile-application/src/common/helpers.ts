import { Platform } from 'react-native';
import { router } from 'expo-router';
import { APP_PROTO, EMPTY_VALUE, ONE_SECOND_MILISECONDS, WEB_PLATFORM } from './constants';

/** 
 * Checks if the platform is web
 * @returns boolean
 */
export const isWeb = (): boolean => Platform.OS === WEB_PLATFORM;

/** 
 * Gets the current time
 * @returns number
 */
export const getCurrentTime = (): number => new Date().getTime();

/**
 * Calculates the expire time
 * 
 * @param  {number} expiresIn
 * @returns number
 */
export const calculateExpireTime = (expiresIn: number): number => getCurrentTime() + expiresIn * ONE_SECOND_MILISECONDS;


/** 
 * Extracs icon name
 * @returns string
 */
export const extractIconName = (iconUrl: string): string => iconUrl.replace(APP_PROTO, EMPTY_VALUE)

/**
 * Navigates to a given path
 * 
 * @param  {string} pathname
 * @param  {any} params
 * @returns void
 */
export const goToPath = (pathname: string, params: Record<string, any> = undefined): void => {
  router.push({
    pathname,
    params,
  });
};
