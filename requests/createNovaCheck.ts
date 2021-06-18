import fetch, { withBearer } from "../utils/fetch";

export const createNovaCheck = async (novacheck: NovaCheck, token: string) => {
  const formData = new FormData();

  formData.append("nova_id", novacheck.nova_id.toString());
  formData.append("drugsheet_id", novacheck.drugsheet_id.toString());
  formData.append("end", novacheck.end?.toString() ?? "");
  formData.append("start", novacheck.start?.toString() ?? "");
  formData.append("date", novacheck.date.toString());
  formData.append("drug_id", novacheck.drug_id.toString());

  const response = await fetch("/novacheck", {
    method: "POST",
    body: formData,
    ...withBearer(token),
  });

  return response;
};
