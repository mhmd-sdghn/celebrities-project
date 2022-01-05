import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
} from "@mantine/core";
import useStyles from "./styles";
import { Celebrity } from "../../../types/Response";

function MyCard({ data }: { data: Celebrity }) {
  if (!data) return <></>;

  const theme = useMantineTheme();

  const { classes } = useStyles();

  return (
    <div>
      <Card shadow='sm' padding='lg'>
        <Card.Section>
          <Image src={data.image} height={160} alt='Norway' />
        </Card.Section>

        <Group position='apart' className={classes.wrapper}>
          <Text weight={500}>{data.title}</Text>
          <Badge color='pink' variant='light'>
            <p>{data.face}</p>
          </Badge>
        </Group>

        <Text size='sm' className={classes.descriptionText}>
          {data.description.substring(120)} و...
        </Text>

        <Button variant='light' fullWidth className={classes.seeMoreBtn}>
          مشاهده جزییات
        </Button>
      </Card>
    </div>
  );
}

export default MyCard;
