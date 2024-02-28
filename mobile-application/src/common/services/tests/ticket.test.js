import { getServicesAPIInstance } from "../api-configuration";
import { getDeviceAuthHeaders } from "../../device-connection";
import { loadTicketDetails } from "../ticket";

jest.mock('../api-configuration');
jest.mock('../../device-connection');

describe('Tickets service', () => {
  const mockApiInstance = {
    createServiceTurn: jest.fn(),
  };

  beforeEach(() => {
    getServicesAPIInstance.mockReturnValue(mockApiInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loadServices', () => {
    const mockServiceId = '1234';
    const mockCustomerName = 'mock-customer-name';
    const mockAuthHeaders = {
      applicationId: 'mock-application-id',
      authorization: 'mock-authorization',
    };
    const mockTurnResponse = {
      id: 1,
      ticketNumber: 'mock-ticket-number',
      peopleInQueue: 15,
    };
  
    beforeEach(() => {
      mockApiInstance.createServiceTurn.mockResolvedValue(mockTurnResponse);
      getDeviceAuthHeaders.mockResolvedValue(mockAuthHeaders);
    });
  
    it('creates a service turn through the service api as expected', async () => {
      const response = await loadTicketDetails(mockServiceId, mockCustomerName);
      expect(response).toEqual({
        details: {
          id: mockTurnResponse.id.toString(),
          service: mockServiceId,
          value: mockTurnResponse.ticketNumber
        },
        usersInQueue: mockTurnResponse.peopleInQueue,
      });
      expect(mockApiInstance.createServiceTurn).toHaveBeenCalledTimes(1);
      expect(mockApiInstance.createServiceTurn).toHaveBeenCalledWith(
        { customerName: mockCustomerName },
        1234,
        mockAuthHeaders.applicationId,
        mockAuthHeaders.authorization,
      );
      expect(getServicesAPIInstance).toHaveBeenCalledTimes(1);
      expect(getServicesAPIInstance).toHaveBeenCalledWith();
      expect(getDeviceAuthHeaders).toHaveBeenCalledTimes(1);
      expect(getDeviceAuthHeaders).toHaveBeenCalledWith();
    });
  });
});