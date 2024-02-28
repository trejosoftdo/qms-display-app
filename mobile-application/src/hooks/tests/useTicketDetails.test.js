import { useProgress } from "../../common/hooks";
import { loadTicketDetails } from "../../common/services/ticket";
import useTicketDetails from "../useTicketDetails";

jest.mock('../../common/hooks');
jest.mock('../../common/services/ticket');

describe('useTicketDetails hook', () => {
  const mockService = 'test-service-id';
  const mockCustomerName = 'test customer';
  const mockTicketDetails = [{
    ticketNumber: 'test-ticket-number',
  }];

  beforeEach(() => {
    loadTicketDetails.mockResolvedValue(mockTicketDetails);
    useProgress.mockImplementation(async (promise) => ({
      loading: false,
      error: null,
      data: await promise,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('loads the ticket details as expected', async () => {
    const result = await useTicketDetails(mockService, mockCustomerName);
    expect(result).toEqual({
      loading: false,
      error: null,
      data: mockTicketDetails,
    });
    expect(loadTicketDetails).toHaveBeenCalledTimes(1);
    expect(loadTicketDetails).toHaveBeenCalledWith(mockService, mockCustomerName);
    expect(useProgress).toHaveBeenCalledTimes(1);
    expect(useProgress).toHaveBeenCalledWith(expect.any(Promise));
  });
});