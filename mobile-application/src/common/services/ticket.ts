import * as api from '../../generated/api';
import { getDeviceAuthHeaders } from '../device-connection';
import { TicketDetailsData } from '../models';
import { getServicesAPIInstance } from './api-configuration';


/**
 * Loads ticket details
 * @param  {string} serviceId
 * @param  {string} customerName
 * @returns Promise<TicketDetailsData>
 */
export const loadTicketDetails = async (serviceId: string, customerName: string): Promise<TicketDetailsData> => {
  const apiInstance = getServicesAPIInstance();
  const {
    applicationId,
    authorization,
  } = await getDeviceAuthHeaders();

  const response = await apiInstance.createServiceTurn(
    { customerName },
    +serviceId,
    applicationId,
    authorization
  );

  return {
    details: {
      id: response.id.toString(),
      service: serviceId,
      value: response.ticketNumber,
    },
    usersInQueue: response.peopleInQueue,
  };
};
