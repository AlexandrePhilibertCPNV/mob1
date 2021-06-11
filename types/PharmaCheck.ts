type PharmaCheck = {
  id: number;
  date: string | Date;
  start: number;
  end: number | null;
  batch_id: number;
  drugsheet_id: number;
  drug: string;
  batch_number: string;
};
