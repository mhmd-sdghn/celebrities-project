import { Celebrity } from "./Celebrities";

export type Response<T> = T | T[];

export interface Work {
  _id: string;
  title: string;
  description: string;
  author: Celebrity;
  __v: number;
}

export type Works = Response<Work>;
