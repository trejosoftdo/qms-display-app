import { useProgress } from "../common/hooks";
import { TurnsStatusTableData, Progress } from "../common/models";
import { loadTurnsStatusTable } from "../common/services/service-turn";

/**
 * Hook to get the turns status table data
 * @returns Progress<TurnsStatusTableData>
 */
const useTurnsStatusTable = (): Progress<TurnsStatusTableData> => useProgress<TurnsStatusTableData>(
  loadTurnsStatusTable(),
  null,
  () => loadTurnsStatusTable(),
);

export default useTurnsStatusTable;
