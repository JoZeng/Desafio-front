import { useState, useCallback } from "react";

export default function useRefreshTrigger() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUpdateData = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  return { refreshTrigger, handleUpdateData };
}
