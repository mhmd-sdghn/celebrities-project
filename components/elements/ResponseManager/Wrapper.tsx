import { ResponseManagerProps } from "../../../types/AuxProps";

function ResponseManagerWrapper(props: ResponseManagerProps) {
  const { children, isLoading, isError } = props;

  const ResponseManagerError = children.find(
    (child: any) => child.type.name === "ResponseManagerError"
  );

  const ResponseManagerLoading = children.find(
    (child: any) => child.type.name === "ResponseManagerLoading"
  );

  const ResponseManagerData = children.find(
    (child: any) => child.type.name === "ResponseManagerData"
  );

  return (
    <>
      {isError
        ? ResponseManagerError
        : isLoading
        ? ResponseManagerLoading
        : ResponseManagerData}
    </>
  );
}

export default ResponseManagerWrapper;
