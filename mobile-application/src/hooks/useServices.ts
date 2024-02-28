import { useProgress } from "../common/hooks";
import { Progress, ServicesData } from "../common/models";
import { loadServices } from "../common/services/service";

/**
 * Hook to get the available services
 * @param {number} categoryId
 * @returns Progress<ServicesData>
 */
const useServices = (categoryId: number): Progress<ServicesData> => useProgress<ServicesData>(loadServices(categoryId));

export default useServices;
