/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { ShiftReport } from "./types/shiftReport";

export type BottomTabParamList = {
  TabConsultation: undefined;
  TabReport: undefined;
  TabWorkPlan: undefined;
};

export type TabConsultationParamList = {
  ConsultationScreen: undefined;
  Actions: undefined;
};

export type TabReportParamList = {
  ReportScreen: {
    report: ShiftReport;
  };
};

export type TabWorkPlanParamList = {
  WorkPlanScreen: undefined;
};
