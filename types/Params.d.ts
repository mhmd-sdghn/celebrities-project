import { Celebrity } from "./Celebrities";
import { Work } from "./Works";
export interface NewFaceDrawerProps {
  opened: boolean;
  refetch: () => void;
  setOpened: (open: boolean) => void;
}

export interface EditFaceDrawerProps extends NewFaceDrawerProps {
  data: Celebrity | undefined;
}

export interface EditWorkDrawerProps extends NewFaceDrawerProps {
  data: Work | undefined;
}
