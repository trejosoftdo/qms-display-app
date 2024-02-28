import * as api from '../../generated/api';
import { CategoriesData } from '../models';
import { getDeviceAuthHeaders } from '../device-connection';
import { getCategoriesAPIInstance } from './api-configuration';
import { extractIconName } from '../helpers';

/**
 * Load categories data
 * @returns Promise<CategoriesData>
 */
export const loadCategories = async (): Promise<CategoriesData> => {
  const apiInstance = getCategoriesAPIInstance();
  const {
    applicationId,
    authorization,
  } = await getDeviceAuthHeaders();

  const response = await apiInstance.getCategories(applicationId, authorization);

  return {
    total: response.length,
    items: response.map(item => ({
      id: item.id.toString(),
      name: item.name,
      label: item.name,
      icon: extractIconName(item.iconUrl),
    })),
  };
};
