const cache: { [key: string]: any } = {};

// eslint-disable-next-line no-unused-vars
export const fetchData = async <T>(url: string, parser?: (data: any) => T): Promise<T> => {
  const normalizedUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  if (cache[normalizedUrl]) {
    return parser ? parser(cache[normalizedUrl]) : cache[normalizedUrl];
  }

  const response = await fetch(url);
  const data = await response.json();
  cache[normalizedUrl] = data;

  const result = parser ? parser(data) : data;
  return result;
};
