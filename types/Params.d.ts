import { Celebrity } from "./Celebrities";
export interface NewFaceDrawerProps {
  opened: boolean;
  refetch: () => void;
  setOpened: (open: boolean) => void;
}

export interface EditFaceDrawerProps extends NewFaceDrawerProps {
  data: Celebrity | undefined;
}
