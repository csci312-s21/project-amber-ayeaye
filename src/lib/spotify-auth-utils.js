/* 
  spotify-auth-utils.js
  This file deals with authentication to the Spotify API
*/

export async function authenticate() {
  const BASE_URL = "https://accounts.spotify.com/api/token";

  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer(
        `${process.env["CLIENT_ID"]}:${process.env["CLIENT_SECRET"]}`
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const auth = await response.json();

  return auth;
}
