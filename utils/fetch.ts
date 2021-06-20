const apiUrl = "http://10.0.2.2:8000/api/";

export type FetchResponse<T> = {
  data: T;
  status: number;
  statusText: string;
};

interface CustomOptions extends RequestInit {
  body?: any;
}

export default async <T = any>(
  url: string,
  customOptions: CustomOptions = { headers: {} }
): Promise<FetchResponse<T>> => {
  const isFormData = customOptions.body instanceof FormData;

  // Content-Type header should not be json if we are sending form-data content
  const headers: HeadersInit = isFormData
    ? {}
    : { "Content-Type": "application/json" };

  const options: RequestInit = {
    method: "GET",
    ...customOptions,
    headers: {
      ...headers,
      ...customOptions.headers,
    },
  };

  if (customOptions.body && !isFormData) {
    options.body = JSON.stringify(customOptions.body);
  }

  const cleanedUrl = cleanUrl(url);
  const response = await fetch(cleanedUrl, options);
  let data;

  // This try-catch is used as some requests do not return a JSON Content-Type
  // but contain a JSON body. This means we cannot check the existence of the
  // header in order to parse the body as JSON.
  try {
    data = await response.json();
  } catch (e) {
    // The response body cannot be parsed as JSON
  }

  return {
    data: data,
    status: response.status,
    statusText: response.statusText,
  };
};

/**
 * /some/path/ -> /some/path
 * https://example.com/other/path/ -> https://example.com/other/path
 *
 * @param {string} url
 * @return {string} The cleaned path
 */
function cleanUrl(url: string): string {
  // Remove the trailing slash
  let cleanPath = url.replace(/^\//, "");

  if (!cleanPath.startsWith("http")) {
    cleanPath = `${apiUrl}${cleanPath}`;
  }

  return cleanPath;
}

/**
 * Helper function that takes a token as argument and returns fetch headers
 *
 * @export
 * @param {string} token
 * @return { headers: HeadersInit }
 */
export function withBearer(token: string): { headers: HeadersInit } {
  return {
    headers: {
      Authorization: `Bearer ${token.trim()}`,
    },
  };
}
