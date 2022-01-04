import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
} from "@mantine/core";
import { Celebrity } from "../../types/Response";

function MyCard({ data }: { data: Celebrity }) {
  if (!data) return <></>;

  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div>
      <Card shadow='sm' padding='lg'>
        <Card.Section>
          <Image src={data.image} height={160} alt='Norway' />
        </Card.Section>

        <Group
          position='apart'
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text weight={500}>{data.title}</Text>
          <Badge color='pink' variant='light'>
            <p>{data.face}</p>
          </Badge>
        </Group>

        <Text
          size='sm'
          style={{
            color: secondaryColor,
            lineHeight: 1.5,
          }}
        >
          {data.description.substring(120)} و...
        </Text>

        <Button variant='light' fullWidth style={{ marginTop: 14 }}>
          مشاهده جزییات
        </Button>
      </Card>
    </div>
  );
}

export default MyCard;
