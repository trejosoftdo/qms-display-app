import { useProgress } from "../common/hooks";
import { CategoriesData, Progress } from "../common/models";
import { loadCategories } from "../common/services/category";

/**
 * Hook to get the available categories
 * @returns Progress<CategoriesData>
 */
const useCategories = (): Progress<CategoriesData> => useProgress<CategoriesData>(loadCategories());

export default useCategories;
