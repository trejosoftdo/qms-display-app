import { getCategoriesAPIInstance } from "../api-configuration";
import { getDeviceAuthHeaders } from "../../device-connection";
import { loadServices } from "../service";

jest.mock('../api-configuration');
jest.mock('../../device-connection');

describe('Services service', () => {
  const mockApiInstance = {
    getCategoryServices: jest.fn(),
  };

  beforeEach(() => {
    getCategoriesAPIInstance.mockReturnValue(mockApiInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loadServices', () => {
    const mockCategoryId = 'mock-category-id';
    const mockAuthHeaders = {
      applicationId: 'mock-application-id',
      authorization: 'mock-authorization',
    };
    const mockCategoryServicesResponse = [
      {
        id: 1,
        name: 'mock-name-1',
        iconUrl: 'app://test-icon-1',
      },
      {
        id: 2,
        name: 'mock-name-2',
        iconUrl: 'app://test-icon-2',
      }
    ];
  
    beforeEach(() => {
      mockApiInstance.getCategoryServices.mockResolvedValue(mockCategoryServicesResponse);
      getDeviceAuthHeaders.mockResolvedValue(mockAuthHeaders);
    });
  
    it('loads category services through the category api as expected', async () => {
      const response = await loadServices(mockCategoryId);
      expect(response).toEqual({
        items: [
          {
            icon: 'test-icon-1',
            id: '1',
            label: 'mock-name-1',
            name: 'mock-name-1',
            categoryId: mockCategoryId,
          },
          {
            icon: 'test-icon-2',
            id: '2',
            label: 'mock-name-2',
            name: 'mock-name-2',
            categoryId: mockCategoryId,
          },
        ],
        total: 2,
      });
      expect(mockApiInstance.getCategoryServices).toHaveBeenCalledTimes(1);
      expect(mockApiInstance.getCategoryServices).toHaveBeenCalledWith(
        mockCategoryId,
        mockAuthHeaders.applicationId,
        mockAuthHeaders.authorization,
      );
      expect(getCategoriesAPIInstance).toHaveBeenCalledTimes(1);
      expect(getCategoriesAPIInstance).toHaveBeenCalledWith();
      expect(getDeviceAuthHeaders).toHaveBeenCalledTimes(1);
      expect(getDeviceAuthHeaders).toHaveBeenCalledWith();
    });
  });
});