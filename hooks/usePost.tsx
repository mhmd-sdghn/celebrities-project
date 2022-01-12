import { AxiosError, AxiosRequestConfig } from "axios";

import { useMutation, UseMutationOptions } from "react-query";
import axios from "../axios";


function usePost<TResponse = unknown, TData = unknown>(
  axiosOptions: AxiosRequestConfig<TResponse>,
  options?: UseMutationOptions<TResponse, AxiosError, TData>
) {
  const mutation = useMutation<TResponse, AxiosError, TData>(
    (data) => handleRequest<TData>({ ...axiosOptions, data }),
    options
  );

  return mutation;
}

async function handleRequest<TData>(axiosOptions: AxiosRequestConfig<TData>) {
  return axios(axiosOptions).then((res) => res.data);
}

export default usePost;
