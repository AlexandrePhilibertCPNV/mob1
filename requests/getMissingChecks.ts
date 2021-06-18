import fetch, { withBearer, FetchResponse } from "../utils/fetch";

interface MissingChecksResponse {
  pharma: PharmaCheck[];
  nova: NovaCheck[];
}

export async function getMissingChecks(
  baseId: number,
  token: string
): Promise<FetchResponse<MissingChecksResponse>> {
  const response = await fetch<MissingChecksResponse>(
    `/missingchecks/${baseId}`,
    withBearer(token)
  );

  return response;
}
