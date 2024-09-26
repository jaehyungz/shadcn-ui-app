import Cookies from "js-cookie";

// import https from "https";
// import fetch from "node-fetch";

export async function fetcher(
  url: string,
  init?: RequestInit,
  serverCookie?: string
) {
  const baseURL =
    typeof window === "undefined"
      ? process.env.BACKEND_URL
      : process.env.NEXT_PUBLIC_BACKEND_URL;
  const response = await fetch(`${baseURL}${url}`, {
    headers: {
      Authorization:
        typeof window === "undefined"
          ? serverCookie ?? ""
          : Cookies.get("token") ?? "",
      ...init?.headers,
    },
    ...init,
  });

  if (!response.ok) {
    const res = await response.json();
    console.log(res);

    throw new Error(res.message, {
      cause: {
        code:
          response.status === 401 || response.status === 403
            ? response.status
            : "default",
      },
    });
  }

  return response;
}
