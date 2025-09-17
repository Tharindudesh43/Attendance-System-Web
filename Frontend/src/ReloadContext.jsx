// ✅ This is valid JS - make sure this is your file content
import { createContext, useContext, useState } from "react";

const ReloadContext = createContext();

export function ReloadProvider({ children }) {
  const [reload, setReload] = useState(false);
  const [findingDuplicateSubjects, setfindingDuplicateSubjects] = useState(false);

  return (
    <ReloadContext.Provider value={{ reload, setReload,findingDuplicateSubjects, setfindingDuplicateSubjects }}>
      {children}
    </ReloadContext.Provider>
  );
}

export function useContextData() {
  return useContext(ReloadContext);
}