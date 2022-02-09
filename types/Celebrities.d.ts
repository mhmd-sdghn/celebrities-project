import { Works } from "./Works";

export type Response<T> = T | T[];

export interface Celebrity {
  _id: string;
  title: string;
  image: string;
  face: string;
  birthday: string;
  works: Works;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export type Celebrities = Response<Celebrity>;
