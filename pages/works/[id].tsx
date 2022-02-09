import { useRouter } from "next/router";
import Layout from "../../components/layouts/main";
import {
  Image,
  Title,
  Text,
  Grid,
  Col,
  Button,
  Card,
  Paper,
  Avatar,
  Group,
} from "@mantine/core";
import useFetch from "../../hooks/useFetch";
import { Celebrity } from "../../types/Celebrities";
import { Work } from "../../types/Works";
import Link from "next/link";

function CelebrityPage() {
  const router = useRouter();

  const url =
    router && router.query && router.query.id
      ? `/works/${router.query.id}`
      : "";

  const { data } = useFetch<Work>(url);

  return (
    <Layout>
      {!data ? (
        <>لطفا صبر کنید</>
      ) : (
        <>
          <Title order={1}>{data.title}</Title>
          <Text size='md' style={{ margin: "10px", color: "gray" }}>
            صاحب اثر: {data.author.title}
          </Text>
          <Text size='md'>{data.description}</Text>
          <Card shadow='sm' padding='lg'>
            <Grid>
              <Col span={2}>
                <Avatar src={data.author.image} radius='xl' size='xl' />
              </Col>
              <Col span={10}>
                <Group>
                  <Title order={3}>{data.author.title}</Title>
                  <Text size='sm' color='gray'>
                    {data.author.description.substring(0, 200)}
                  </Text>
                  <Link passHref href={`/celebrities/${data.author._id}`}>
                    <Button>توضیحات بیشتر از {data.author.title}</Button>
                  </Link>
                </Group>
              </Col>
            </Grid>
          </Card>
        </>
      )}
    </Layout>
  );
}

export default CelebrityPage;
