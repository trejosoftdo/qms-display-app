import { useProgress } from "../common/hooks";
import { Progress, TicketDetailsData } from "../common/models";
import { loadTicketDetails } from "../common/services/ticket";

/**
 * Hook used to get the details of a ticket for a given service.
 * @param  {string} service
 * 
 * @returns Progress<TicketDetailsData>
 */
const useTicketDetails = (service: string, customerName: string): Progress<TicketDetailsData> => useProgress<TicketDetailsData>(loadTicketDetails(service, customerName));

export default useTicketDetails;
