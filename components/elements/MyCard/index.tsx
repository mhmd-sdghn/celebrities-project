import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import useStyles from "./styles";
import { Celebrity } from "../../../types/Celebrities";

function MyCard({ data }: { data: Celebrity }) {
  if (!data) return <></>;

  const { classes } = useStyles();

  return (
    <>
      <Card shadow='sm' padding='lg' className={classes.container}>
        <Card.Section>
          <Image src={data.image} height={160} alt='Norway' />
        </Card.Section>

        <Group position='apart' className={classes.wrapper}>
          <Text weight={800}>{data.title}</Text>
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
    </>
  );
}

export default MyCard;
