import { Audio } from 'expo-av';
import * as api from '../../generated/api';
import { delay, getResponseBlobUrl } from '../helpers';
import { TurnsStatusTableData } from '../models';
import { getDeviceAuthHeaders } from '../device-connection';
import { getServiceTurnsAPIInstance } from './api-configuration';

/**
 * Loads the text audio
 * @param  {string} text 
 * @returns Promise<any>
 */
const loadTextAudio = async (text: string): Promise<void> => {
  const apiInstance = getServiceTurnsAPIInstance();
  const {
    applicationId,
    authorization,
  } = await getDeviceAuthHeaders();

  const response = await apiInstance.getTurnAudio(text);
  const uri = await getResponseBlobUrl(response);
  const sound = new Audio.Sound();
  await sound.loadAsync({ uri }, { shouldPlay: true });
};

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
