import fetch, { withBearer } from "../utils/fetch";

export const confirmWorkPlan = async (workPlan: WorkPlan, token: string) => {
  const formData = new FormData();

  formData.append("id", workPlan.id.toString());
  formData.append("confirmation", workPlan.confirmation!.toString());

  if (workPlan.reason) {
    formData.append("reason", workPlan.reason.toString());
  }

  const response = await fetch("/confirmworkplan", {
    method: "POST",
    body: formData,
    ...withBearer(token),
  });

  return response;
};
