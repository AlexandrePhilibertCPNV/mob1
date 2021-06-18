import fetch, { withBearer } from "../utils/fetch";

export async function getReports(token: string) {
  const response = await fetch("/reports", withBearer(token));

  return response;
}
