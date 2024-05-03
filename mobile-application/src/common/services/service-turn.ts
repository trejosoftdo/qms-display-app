import { Audio } from 'expo-av';
import * as api from '../../generated/api';
import { TurnsStatusTableData } from '../models';
import { getDeviceAuthHeaders } from '../device-connection';
import { getServiceTurnsAPIInstance } from './api-configuration';

/**
 * Load turns status table data
 * @returns Promise<TurnsStatusTableData>
 */
export const loadTurnsStatusTable = async (): Promise<TurnsStatusTableData> => {
  const apiInstance = getServiceTurnsAPIInstance();
  const {
    applicationId,
    authorization,
  } = await getDeviceAuthHeaders();

  const response = await apiInstance.getTurnsStatusTable(applicationId, authorization);

  return {
    items: response.map(item => ({
      ticketNumber: item.ticketNumber,
      queueName: item.queueName,
      statusName: item.statusName,
      statusCode: item.statusCode,
    })),
  };
};

/**
 * Loads the text audio
 * @param  {string} text 
 * @returns Promise<any>
 */
export const loadTextAudio = async (text: string): Promise<void> => {
  const apiInstance = getServiceTurnsAPIInstance();
  const {
    applicationId,
    authorization,
  } = await getDeviceAuthHeaders();

  const response = await apiInstance.getTurnAudio(text);
  const audioStream = await response.blob();
  const uri = URL.createObjectURL(audioStream);
  const sound = new Audio.Sound();
  await sound.loadAsync({ uri }, { shouldPlay: true });
};

/**
 * Waits for certain time
 * @param  {number} timeout 
 * @returns Promise<any>
 */
const delay = (timeout: number) => new Promise((resolve) => {
  setTimeout(resolve, timeout);
});

/**
 * Loads multiple audio
 * @param  {string[]} items 
 * @returns Promise<any>
 */
export const loadMultipleAudio = async (items: string[]): Promise<void> => {
  for (const text of items) {
    await loadTextAudio(text);
    await delay(2000);
  }
};
