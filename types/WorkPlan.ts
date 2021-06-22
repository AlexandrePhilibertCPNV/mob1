type WorkPlan = {
  id: number;
  worktime_id: number;
  user_id: number;
  date: string | Date;
  confirmation: 0 | 1 | null;
  reason: string | null;
  worktime: {
    id: number;
    code: number;
    type: string;
    day: string | null;
    base_id: number | null;
  };
};
