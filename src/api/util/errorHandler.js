export function checkErrorAndReturnMessage(error) {
  if (error.response) {
    return error.response.data.message;
  } else if (error.request) {
    return "Network Error Please Try Again";
  } else {
    console.log(error);
  }
  console.log(error.config);
}
