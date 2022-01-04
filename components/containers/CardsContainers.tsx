import { Grid, Col, useMantineTheme } from "@mantine/core";
import useFetch from "../../hooks/useFetch";
import { Celebrities, Celebrity, Response } from "../../types/Response";
import MyCard from "../elements/MyCard";

function CardContainers() {
  const theme = useMantineTheme();

  const { data, isLoading } = useFetch<Celebrities>("/celebrities", {
    initialData: [],
  });

  return (
    <div style={{ marginTop: theme.spacing.lg }}>
      {isLoading ? (
        <span>loading</span>
      ) : (
        <Grid>
          {!data || !Array.isArray(data)
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
