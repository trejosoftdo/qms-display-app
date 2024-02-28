import * as api from '../../generated/api';
import { getDeviceAuthHeaders } from '../device-connection';
import { extractIconName } from '../helpers';
import { ServicesData } from '../models';
import { getCategoriesAPIInstance } from './api-configuration';

/**
 * Load services data
 * @returns Promise<ServicesData>
 */
export const loadServices = async (categoryId: number): Promise<ServicesData> => {
  const apiInstance = getCategoriesAPIInstance();
  const {
    applicationId,
    authorization,
  } = await getDeviceAuthHeaders();

  const response = await apiInstance.getCategoryServices(
    categoryId,
    applicationId,
    authorization
  );

  return {
    total: response.length,
    items: response.map(item => ({
      id: item.id.toString(),
      name: item.name,
      label: item.name,
      icon: extractIconName(item.iconUrl),
      categoryId,
    })),
  };
};
