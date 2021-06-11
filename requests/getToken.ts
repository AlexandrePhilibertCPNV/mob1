import fetch from "../utils/fetch";

interface getTokenBody {
  initials: string;
  password: string;
}

export const getToken = async (body: getTokenBody) => {
  const formData = new FormData();

  formData.append("initials", body.initials);
  formData.append("password", body.password);

  const response = await fetch("/gettoken", {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};
