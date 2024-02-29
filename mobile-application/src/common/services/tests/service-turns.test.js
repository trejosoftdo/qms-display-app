import { getServiceTurnsAPIInstance } from "../api-configuration";
import { getDeviceAuthHeaders } from "../../device-connection";
import { loadTurnsStatusTable } from "../service-turn";

jest.mock('../api-configuration');
jest.mock('../../device-connection');

describe('Service Turns service', () => {
  const mockApiInstance = {
    getTurnsStatusTable: jest.fn(),
  };

  beforeEach(() => {
    getServiceTurnsAPIInstance.mockReturnValue(mockApiInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loadTurnsStatusTable', () => {
    const mockAuthHeaders = {
      applicationId: 'mock-application-id',
      authorization: 'mock-authorization',
    };
    const mockItemsResponse = [
      {
        ticketNumber: 'DS-SA-3',
        queueName: 'Saving Account',
        statusName: 'Pending',
        statusCode: 'PENDING',
      }
    ];
  
    beforeEach(() => {
      mockApiInstance.getTurnsStatusTable.mockResolvedValue(mockItemsResponse);
      getDeviceAuthHeaders.mockResolvedValue(mockAuthHeaders);
    });
  
    it('loads the status table through the service turn api as expected', async () => {
      const response = await loadTurnsStatusTable();
      expect(response).toEqual({
        items: [
          {
            ticketNumber: 'DS-SA-3',
            queueName: 'Saving Account',
            statusName: 'Pending',
            statusCode: 'PENDING',
          },
        ],
      });
      expect(mockApiInstance.getTurnsStatusTable).toHaveBeenCalledTimes(1);
      expect(mockApiInstance.getTurnsStatusTable).toHaveBeenCalledWith(
        mockAuthHeaders.applicationId,
        mockAuthHeaders.authorization,
      );
      expect(getServiceTurnsAPIInstance).toHaveBeenCalledTimes(1);
      expect(getServiceTurnsAPIInstance).toHaveBeenCalledWith();
      expect(getDeviceAuthHeaders).toHaveBeenCalledTimes(1);
      expect(getDeviceAuthHeaders).toHaveBeenCalledWith();
    });
  });
});