import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { QueryFunctionContext, useQuery, UseQueryOptions } from "react-query";
import axios from "../axios";

function useFetch<T = unknown>(
  url: string,
  options?: UseQueryOptions<T, AxiosError>,
  watch?: string[]
) {
  const router = useRouter();

  const query = useQuery<T, AxiosError>(
    [url, watch, router?.query],
    handleRequest,
    options
  );

  return query;
}

/**
 * in this function we are handling request using axios
 * we only use params that are exsit in watch array (key of param exists in watch array)
 * then we create URLSearchParams and additions it to request url
 */
async function handleRequest({
  queryKey: [url, watch, params],
  signal,
}: QueryFunctionContext) {
  if (typeof url === "string") {
    const _params: any = params && typeof params === "object" ? params : {};
    const keyPrams = Object.keys(_params);
    const valueParams = Object.values(_params);

    /**
     * in following lines we are filtering params object
     *  base on watch array (read function comments for more)
     */
    let queryParams = {};
    if (watch && Array.isArray(watch) && params && typeof params === "object") {
      queryParams = Object.keys(_params)
        .filter((key) => watch.includes(key))
        .reduce((obj: any, key: string) => {
          obj[key] = _params[key];
          return obj;
        }, {});
    }

    if (Object.keys(queryParams).length) {
      queryParams = new URLSearchParams(queryParams).toString();
    }

    const { data } = await axios({
      method: "GET",
      url: queryParams ? `${url}?${queryParams}` : url,
      signal,
    });
    return data;
  }

  throw new Error("useFetch url need to be type of string");
}

export default useFetch;
