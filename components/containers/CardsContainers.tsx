import { Grid, Col, useMantineTheme, Alert } from "@mantine/core";
import useFetch from "../../hooks/useFetch";
import { Celebrities, Celebrity, Response } from "../../types/Response";
import MyCard from "../elements/MyCard";
import CardSkeleton from "../elements/MyCard/Skeleton";
import { AlertCircle } from "react-feather";

function CardContainers() {
  const theme = useMantineTheme();

  const { data, isLoading, isError } = useFetch<Celebrities>("/celebrities");

  return (
    <div style={{ marginTop: theme.spacing.lg }}>
      {isError ? (
        <Alert
          icon={<AlertCircle size={16} />}
          title='مشکلی در ارتباط با سرور پیش آمده'
          color='red'
        >
          متاسفانه در حال حاضر دریافت اطلاعات از سرور امکان پذیر نیست ، لطفا
          بعدا دوباره امتحان کنید
        </Alert>
      ) : isLoading ? (
        <Grid>
          {Array.from("x".repeat(5)).map((_x, index) => (
            <Col span={4} key={index}>
              <CardSkeleton />
            </Col>
          ))}
        </Grid>
      ) : (
        <Grid>
          {!data || !Array.isArray(data) || isLoading
            ? null
            : data.map((item: Celebrity) => (
                <Col span={4} key={item._id}>
                  <MyCard data={item} />
                </Col>
              ))}
        </Grid>
      )}
    </div>
  );
}

export default CardContainers;
