export function checkExpToken(exp) {
  if (Date.now() >= exp * 1000) {
    return false;
  }
}
export function sortPost(postData) {
  const data = [...postData].sort(function (a, b) {
    const ab = new Date(a.createdAt);
    const ba = new Date(b.createdAt);
    return ba - ab;
  });
  return data;
}

export const CLOUDNARY_API = process.env.REACT_APP_CLOUDNARY_KEY;
export const CLOUDNARY_PRESET = process.env.REACT_APP_CLOUDNARY_PRESET;
export const API_KEY = process.env.REACT_APP_API_KEY;


