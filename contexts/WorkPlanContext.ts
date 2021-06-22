import React from "react";

interface WorkPlanContextValue {
  workPlans?: WorkPlan[] | null;
  setWorkPlans: (workPlans: WorkPlan[]) => void;
}

export const WorkPlanContext = React.createContext<WorkPlanContextValue | null>(
  {
    setWorkPlans: () => {},
  }
);
