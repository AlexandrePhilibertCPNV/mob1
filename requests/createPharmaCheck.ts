import fetch, { withBearer } from "../utils/fetch";
import { normalizeDateString } from "../utils/date";

export const createPharmaCheck = async (
  pharmacheck: PharmaCheck,
  token: string
) => {
  const formData = new FormData();

  formData.append("batch_id", pharmacheck.batch_id.toString());
  formData.append("drugsheet_id", pharmacheck.drugsheet_id.toString());
  formData.append("start", pharmacheck.start?.toString() ?? "");
  formData.append("end", pharmacheck.end?.toString() ?? "");
  formData.append(
    "date",
    normalizeDateString((pharmacheck.date as Date).toISOString())
  );

  const response = await fetch("/pharmacheck", {
    method: "POST",
    body: formData,
    ...withBearer(token),
  });

  return response;
};
