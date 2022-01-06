import { ReactNode } from "react";

export interface ResponseManagerProps extends AuxProps {
  children: any;
  isLoading: boolean;
  isError: boolean;
}
