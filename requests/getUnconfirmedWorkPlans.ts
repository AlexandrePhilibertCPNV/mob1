import fetch, { withBearer } from "../utils/fetch";

export async function getUnconfirmedWorkPlans(token: string) {
  const response = await fetch("/unconfirmedworkplans", {
    ...withBearer(token),
  });

  return response;
}
