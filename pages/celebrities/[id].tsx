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
} from "@mantine/core";
import useFetch from "../../hooks/useFetch";
import { Celebrity } from "../../types/Celebrities";
import { Work } from "../../types/Works";
import Link from "next/link";

function CelebrityPage() {
  const router = useRouter();

  const url =
    router && router.query && router.query.id
      ? `/celebrities/${router.query.id}`
      : "";

  const { data } = useFetch<Celebrity>(url);

  return (
    <Layout>
      {!data ? (
        <>لطفا صبر کنید</>
      ) : (
        <>
          <div style={{ width: "100%", margin: "auto" }}>
            <Image
              radius='md'
              src={data.image}
              alt={data.title}
              caption={data.title}
            />
          </div>
          <Title order={1}>{data.title}</Title>
          <Text size='md' style={{ margin: "10px", color: "gray" }}>
            تولد: {data.birthday} | رشته: {data.face}
          </Text>
          <Text size='md'>{data.description}</Text>
          {data.works && Array.isArray(data.works) && data.works.length ? (
            <>
              <Title order={2} style={{ margin: "15px 0" }}>
                آثار
              </Title>
              <Paper style={{ marginTop: 15 }} shadow='xs' padding={10}>
                <Grid>
                  {data.works.map((work: Work) => (
                    <Col span={3}>
                      <Card shadow='sm' padding='lg'>
                        <Text size='sm' weight={400}>
                          {work.title}
                        </Text>
                        <Text size='xs' color='gray' style={{ marginTop: 8 }}>
                          {work.description.substring(0, 100)}...
                        </Text>
                        <Link passHref href={`/works/${work._id}`}>
                          <Button
                            variant='light'
                            color='blue'
                            fullWidth
                            style={{ marginTop: 14 }}
                          >
                            نمایش اثر
                          </Button>
                        </Link>
                      </Card>
                    </Col>
                  ))}
                </Grid>
              </Paper>
            </>
          ) : null}
        </>
      )}
    </Layout>
  );
}

export default CelebrityPage;
