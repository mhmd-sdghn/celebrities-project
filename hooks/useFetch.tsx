import { AxiosError } from "axios";
import { useQuery, QueryFunctionContext, UseQueryOptions } from "react-query";
import axios from "../axios";

function useFetch<T = unknown>(
  url: string,
  options?: UseQueryOptions<T, AxiosError>
) {
  const query = useQuery<T, AxiosError>(url, handleGetRequest, options);

  return query;
}

async function handleGetRequest({
  queryKey: [url],
  signal,
}: QueryFunctionContext) {
  if (typeof url === "string") {
    const { data } = await axios({
      method: "GET",
      url,
      signal,
    });
    return data;
  }

  throw new Error("useFetch url must be string");
}

export default useFetch;
