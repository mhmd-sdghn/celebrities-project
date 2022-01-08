import { useEffect } from "react";
import { ResponseManagerProps } from "../../../types/AuxProps";

function ResponseManagerWrapper(props: ResponseManagerProps) {
  const { children, isLoading, isError, noData } = props;

  const ResponseManagerError = children.find(
    (child: any) => child.type.name === "ResponseManagerError"
  );

  const ResponseManagerLoading = children.find(
    (child: any) => child.type.name === "ResponseManagerLoading"
  );

  const ResponseManagerData = children.find(
    (child: any) => child.type.name === "ResponseManagerData"
  );

  const ResponseManagerNoData = children.find(
    (child: any) => child.type.name === "ResponseManagerNoData"
  );

  useEffect(() => {
    console.log(props);
  }, [props]);

  return (
    <>
      {isError
        ? ResponseManagerError
        : isLoading
        ? ResponseManagerLoading
        : noData
        ? ResponseManagerNoData
        : ResponseManagerData}
    </>
  );
}

export default ResponseManagerWrapper;
