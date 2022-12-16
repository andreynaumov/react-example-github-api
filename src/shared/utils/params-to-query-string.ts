export const paramsToQueryString = <T extends Record<string, string>>(queryParams: T) => {
  return Object.entries(queryParams).reduce((queryStringAcc, [paramKey, paramValue]) => {
    const prefix = queryStringAcc.length ? '&' : '?';
    const currentParam = `${prefix}${paramKey}=${paramValue}`;

    return queryStringAcc + currentParam;
  }, '');
};
