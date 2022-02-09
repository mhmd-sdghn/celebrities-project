import Link from "next/link";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Grid,
  Col,
  Avatar,
  Title,
} from "@mantine/core";
import useStyles from "./styles";
import { Work } from "../../../types/Works";

function MyCard({ data }: { data: Work }) {
  if (!data) return <></>;

  const { classes } = useStyles();

  return (
    <>
      <Card shadow='sm' padding='lg' className={classes.container}>
        <Text weight={800}>{data.title}</Text>

        <Text size='sm' className={classes.descriptionText}>
          {data.description.substring(0, 200)} و...
        </Text>

        <Link passHref href={`/celebrities/${data.author._id}`}>
          <Card shadow='sm' padding='xs' style={{ marginTop: 10 }}>
            <Button variant='white' style={{ width: "100%" }}>
              <Group>
                <Avatar src={data.author.image} radius='xl' size='sm' />
                <Text size='sm' color='dark'>
                  {data.author.title}
                </Text>
              </Group>
            </Button>
          </Card>
        </Link>

        <Link passHref href={`/works/${data._id}`}>
          <Button variant='light' fullWidth className={classes.seeMoreBtn}>
            مشاهده جزییات
          </Button>
        </Link>
      </Card>
    </>
  );
}

export default MyCard;
