export function getUrlParams(params) {
  let parameter = "?";

  Object.keys(params).forEach((key) => {
    if (params[key] !== null) {
      parameter += `${key}=${params[key]}&`;
    }
  });

  return parameter;
}
