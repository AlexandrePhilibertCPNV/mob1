type FetchResponse<T> = {
  data: T;
  status: number;
  statusText: string;
};

interface CustomOptions extends RequestInit {
  body?: any;
}

export default async <T = any>(
  path: string,
  customOptions: CustomOptions = { headers: {} }
): Promise<FetchResponse<T>> => {
  const isFormData = customOptions.body instanceof FormData;

  const options: RequestInit = {
    method: "GET",
    ...customOptions,
    headers: {
      "Content-Type": "application/json",
      ...customOptions.headers,
    },
  };

  if (customOptions.body && !isFormData) {
    options.body = JSON.stringify(customOptions.body);
  }

  // Remove the trailing slash
  let cleanPath = path.replace(/^\//, "");

  if (!cleanPath.startsWith("http")) {
    cleanPath = `http://10.0.2.2:8000/api/${cleanPath}`;
  }

  const response = await fetch(cleanPath, options);

  const data = await response.json();

  return {
    data,
    status: response.status,
    statusText: response.statusText,
  };
};
