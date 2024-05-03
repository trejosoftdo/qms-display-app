import { useEffect } from "react";
import { loadMultipleAudio } from "../common/services/service-turn";

/**
 * Calls turns via audio
 */
const useTurnsMessageCalls = (textItems: string[] | undefined): void => {
  useEffect(() => {
    if (textItems?.length) {
      loadMultipleAudio(textItems)
        .catch(console.error);
    }
  }, [textItems?.join('.')]);
};

export default useTurnsMessageCalls;
