const REDDIT_ACCESS_TOKEN_URL = "https://www.reddit.com/api/v1/access_token";
const CLIENT_ID = "LAo7rLD7LwxNjuyP3V5-1w";
const APP_ONLY_GRANT_TYPE = "https://oauth.reddit.com/grants/installed_client";
const DO_NOT_TRACK_THIS_DEVICE = "DO_NOT_TRACK_THIS_DEVICE";

const REDDIT_FETCH_HOSTNAME = "https://oauth.reddit.com";

export const getAppToken = async () => {
  const url = new URL(REDDIT_ACCESS_TOKEN_URL);

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${window.btoa(`${CLIENT_ID}:`)}`,
  };

  const body = new URLSearchParams();
  body.append("grant_type", APP_ONLY_GRANT_TYPE);
  body.append("device_id", DO_NOT_TRACK_THIS_DEVICE);

  const response = await fetch(url.href, {
    method: "POST",
    headers: headers,
    body: body,
  });

  const json = await response.json();

  return json;
};

export const fetchReddit = async (
  accessToken: string,
  pathname: string,
  search: string
) => {
  const url = new URL(`${REDDIT_FETCH_HOSTNAME}${pathname}`);

  const params = new URLSearchParams(search);
  params.append("raw_json", "1");

  const stringUrl = `${url.href}?${params.toString()}`;

  const headers = {
    Authorization: `bearer ${accessToken}`,
  };

  const response = await fetch(stringUrl, {
    method: "GET",
    headers: headers,
  });

  const json = await response.json();
  return json;
};

export const fetchMoreJson = async (
  accessToken: string,
  childrenIds: string[],
  articleId: string,
  search: string
) => {
  const params = new URLSearchParams(search);
  params.append("api_type", "json");
  params.append("children", childrenIds.join(","));
  params.append("link_id", articleId);

  const json = await fetchReddit(
    accessToken,
    "/api/morechildren",
    params.toString()
  );

  return json;
};

export const fetchProfileImg = async (accessToken: string, author: string) => {
  const json = await fetchReddit(accessToken, `/user/${author}/about`, "");

  return json.data.icon_img;
};