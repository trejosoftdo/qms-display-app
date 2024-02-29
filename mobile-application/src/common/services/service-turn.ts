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
