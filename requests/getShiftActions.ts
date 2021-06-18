import fetch, { withBearer } from "../utils/fetch";

export async function getShiftActions(reportId: number, token: string) {
  const response = await fetch(
    `/myactionsinshift/${reportId}`,
    withBearer(token)
  );

  return response;
}
